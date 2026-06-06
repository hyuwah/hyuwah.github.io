---
title: "MVI Architecture in Kotlin Android: State Management Made Simple"
description: "Master Model-View-Immutable architecture for clean, testable Android code using state machines and RxJava/Kotlin Coroutines"
pubDate: 2026-04-13T09:00:00Z
tags: [Kotlin, Android, MVI, State Management, Architecture]
---

MVI (Model-View-Immutable) is a software architecture pattern that provides clean separation of concerns and unidirectional data flow — perfect for modern Kotlin Android development. This guide walks through implementing MVI with Kotlin Coroutines, RxJava 3, and Jetpack Compose.

## What is MVI?

MVI separates your UI from business logic into three clear layers:
- **Model**: Immutable state holding application data and actions
- **View**: Composition logic that displays the current model state
- **Immutable Actions**: Events that trigger updates to the model without mutation

The flow is: View → Actions (Event) → Model (State) → Update View

## Setup: Project Structure

Create a modular architecture with separate packages for each layer:

```
app/
├── domain/           # Pure business logic, no dependencies on Android frameworks
│   └── user/
│       ├── UserState.kt     # Immutable sealed class representing all possible states
│       └── UserEvent.kt     # Sealed class with all events
├── data/             # Repositories and external data sources (no UI logic)
│   └── user/
│       ├── UserRepository.kt
│       └── UserDataSource.kt
├── presentation/     # View layer, Compose screens
│   └── user/
│       ├── UserScreen.kt
│       └── UserViewModel.kt
```

## Core Components

### 1. Model (State) - Immutable Sealed Class

The state must never be modified directly — use sealed classes with `copy()`:

```kotlin
data class UserState(
    val id: String?,
    val name: String,
    val email: String?,
    val isLoading: Boolean,
    val error: String? = null
) : SealedClass<UserState>  // Mark as sealed for type safety

// Actions are immutable events
sealed class UserEvent {
    data object OnUserLoaded : UserEvent()
    data object OnErrorOccurred(val message: String) : UserEvent()
}
```

**Why Immutable?**
- Makes testing trivial — you can `val expected = UserState(id, "John", null)` and assert equality
- Thread-safe — no synchronization needed for state changes
- Predictable behavior — same input always produces same output

### 2. Actions/Events - Unidirectional Flow

Events are immutable values that describe what happened:

```kotlin
data object OnUserLoaded : UserEvent()
data object OnNewEmailReceived(val email: String) : UserEvent()
data class OnValidationError(val message: String) : UserEvent()
```

**Key Difference from LiveData:**
- Events are **immutable** snapshots of actions, not observations
- No observers — just a stream of events over time
- Type-safe transitions between states

### 3. ViewModel - The Business Logic Heart

The ViewModel processes events and returns new state:

```kotlin
class UserViewModel(private val userRepository: UserRepository) : ViewModel() {
    
    // Immutable State held in ViewModel
    private var _state = UserState(id = null, name = "", email = null, isLoading = true)
    private var _events = MutableStateFlow<UserEvent>(UserEvent())
    val state: StateFlow<UserState> by viewModel.stateIn(
        scope = this,
        start = SharingStarted.WhileSubscribed(5000), // Cache for Compose
        transformer = SharedSharedFlowTransformation()
    )
    
    fun loadUser() {
        _events.emit(UserEvent.OnUserLoaded())
        viewModel.launchIn(viewModelScope)
            userRepository.getUser()  // Repository layer handles async logic
                .collect { user ->
                    _state = _state.copy(
                        id = user.id,
                        name = user.name,
                        email = user.email,
                        isLoading = false
                    )
                }
    }
}
```

### 4. View - Compose Composition Logic

Compose simply reads the current state:

```kotlin
@Composable
fun UserScreen(state: StateFlow<UserState>) {
    val user by state.collectAsState()
    
    Box(modifier = Modifier.fillMaxSize()) {
        when {
            !user.isLoading -> {
                if (user.error != null) {
                    Text("Error: ${user.error}", color = Color.Red)
                } else {
                    Text(user.name ?: "Unknown user")
                }
            }
            user.isLoading -> {
                CircularProgressIndicator()
            }
        }
    }
}
```

## Complete Example: Email List Screen

Here's a production-ready implementation using Kotlin Coroutines and RxJava 3:

### Domain Layer (Model)

```kotlin
// domain/EmailState.kt
sealed class EmailState(
    val emails: MutableList<Email> = mutableListOf(),
    val isLoading: Boolean = false,
    val searchQuery: String = "",
    val error: String? = null,
    val isSearchActive: Boolean = true  // Show filter when typing
)

// domain/EmailEvent.kt
sealed class EmailEvent {
    data object OnFetchRequested : EmailEvent()
    
    data object OnRefreshClicked : EmailEvent()
    
    data object OnNewEmailReceived(val email: Email) : EmailEvent()
    
    data class OnDeleteEmailClick(val id: String) : EmailEvent()
    
    data class OnSearchQueryChanged(val query: String) : EmailEvent()
}
```

### Data Layer (Repository)

```kotlin
// data/EmailRepository.kt
interface EmailRepository {
    suspend fun fetchUserEmails(): List<Email>
    suspend fun deleteEmail(id: String): Boolean
    suspend fun searchEmails(query: String): List<Email>
}

class EmailRepositoryImpl(  
    private val emailDataSource: EmailDataSource,
    private val userPreferencesRepository: UserPreferencesRepository
) : EmailRepository {
    override suspend fun fetchUserEmails(): List<Email> {
        return emailDataSource.fetchAll()  // No UI logic here!
    }
}
```

### Presentation Layer (ViewModel)

```kotlin
// presentation/EmailViewModel.kt
class EmailViewModel(private val repository: EmailRepository) : ViewModel() {
    
    private var _state = EmailState(emails = mutableListOf())
    private val _events = MutableSharedFlow<EmailEvent>()
    
    val state = _events.asLiveData()  // Or StateFlow for Jetpack Compose
    
    init {
        loadUserEmails()
        setupLifecycleObserver()
    }
    
    fun loadUserEmails() {
        _events.emit(EmailEvent.OnFetchRequested())
        viewModelScope.launch {
            repository.fetchUserEmails().collect { emails ->
                val newState = _state.copy(
                    emails = emails.map { email ->
                        email.copy(isRead = false)  // Don't mutate!
                    },
                    isLoading = false
                )
                
                viewModel.viewModelScope.launch {
                    _events.emit(newState)
                }
            }
        }
    }
    
    fun refresh() {
        _events.emit(EmailEvent.OnRefreshClicked())
        loadUserEmails()
    }
    
    fun deleteEmail(id: String) {
        _events.emit(EmailEvent.OnDeleteEmailClick(id))
        viewModelScope.launch {
            repository.deleteEmail(id).collect { success ->
                if (success) {
                    val newState = _state.copy(
                        emails = _state.emails.filterNot { it.id == id }
                    )
                    viewModel.viewModelScope.launch {
                        _events.emit(newState)
                    }
                } else {
                    val errorState = _state.copy(error = "Failed to delete email")
                    viewModel.viewModelScope.launch {
                        _events.emit(errorState)
                    }
                }
            }
        }
    }
    
    private fun setupLifecycleObserver() {
        lifecycleOwner.lifecycle.addObserver(object : LifecycleObserver {
            @OnStarted
            fun onStart(owner: LifecycleOwner) { loadUserEmails() }  // Reload on resume
            @OnStopped
            fun onStop(owner: LifecycleOwner) { /* Pause background tasks */ }
        })
    }
}
```

### View Layer (Compose)

```kotlin
// presentation/EmailScreen.kt
@OptIn(ExperimentalFoundationApi::class, ExperimentalComposeUiApi::class)
@Composable
fun EmailScreen(
    viewModel: EmailViewModel = ViewModelFactory.getInstance().get(EmailViewModel::class.java),
    navController: NavHostController
) {
    val state by viewModel.state.collectAsState()
    
    Box(modifier = Modifier.fillMaxSize()) {
        Column(modifier = Modifier.padding(top = 48.dp)) {
            
            // Header with refresh button
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
                    .align(Alignment.CenterHorizontally),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("Inbox", style = TextStyle(fontSize = 24.sp, fontWeight = FontWeight.Bold))
                
                Button(onClick = { viewModel.refresh() }) {
                    Text("Refresh")
                }
            }
            
            // Search bar with filter
            TextField(
                value = state.searchQuery,
                onValueChange = { query ->
                    val newEvent = EmailState(
                        searchQuery = query,
                        isSearchActive = query.isNotEmpty()
                    )
                    viewModel.viewModelScope.launch {
                        _events.emit(newEvent)
                    }
                },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("Search emails...") }
            )
            
            // Email list
            if (state.isLoading) {
                CircularProgressIndicator(modifier = Modifier.padding(32.dp))
            } else if (state.error != null) {
                ErrorView(
                    message = state.error,
                    onRetry = { viewModel.refresh() }
                )
            } else {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(state.emails, key = { it.id }) {
                        EmailItem(email = it)
                    }
                }
            }
        }
    }
}
```

## Advanced Patterns

### 1. Action Replay (Undo/Redo)

Store past events in a history collection for undo functionality:

```kotlin
class EmailViewModel(...):
    private var _history = mutableListOf<EmailEvent>()
    
    fun deleteEmail(id: String) {
        val event = EmailEvent.OnDeleteEmailClick(id)
        val newHistory = _history.toMutableList()
        newHistory.add(event)
        
        viewModel.viewModelScope.launch {
            _state = _state.copy(emails = emails.filterNot { it.id == id })
            _events.emit(_state)
            _history.addAll(newHistory)
        }
    }
}
```

### 2. Reducer Pattern for State Updates

For complex state machines, use reducers that map actions to new states:

```kotlin
fun EmailReducer(state: EmailState, event: EmailEvent): EmailState = when (event) {
    is EmailEvent.OnFetchRequested -> 
        state.copy(isLoading = true)
    is EmailEvent.OnDeleteEmailClick -> 
        reducer(state, EmailEvent.OnNewEmailReceived())  // Handle deletion
}
```

### 3. State Machine Pattern

Use finite state machines (FSM) for complex workflows:

```kotlin
sealed class WorkflowState(val payload: Any?)
data object Idle : WorkflowState(null)
data object Loading : WorkflowState(null)
data class Success(val data: Any) : WorkflowState(data)
data class Failed(val error: Throwable) : WorkflowState(error)
class WorkflowStateMachine {
    fun transition(current: WorkflowState, event: String): WorkflowState = when (current) {
        Idle -> if (event == "start") Loading else current
        Loading -> 
            when (event) {
                "success" -> Success(payload),
                "fail" -> Failed(Throwable("Error"))
                else -> current
            }
    }
}
```

## Benefits of MVI in Android

1. **Testability**: You can test business logic without UI, just instantiate ViewModel and check state transitions:

```kotlin
@Test
fun `ViewModel should emit new state on delete click`() {
    val viewModel = EmailViewModel(repository)
    val eventFlow = MutableSharedFlow<EmailEvent>()
    
    viewModel.viewModelScope.launch { eventFlow.collect { events -> }
    
    viewModel.deleteEmail("123")
    // Assert: Event was emitted, state updated correctly
}
```

2. **Debugging**: Immutable states make it easy to use diffing tools and visual debugging:
```kotlin
// Compare two states with a UI diff tool
val diff = StateDiff(userState1, userState2)
```

3. **Performance**: Compose's state collection is optimized for immutable updates — only changed parts re-render.

4. **Type Safety**: Sealed classes prevent invalid state transitions at compile time.

## Migration from LiveData

If you're migrating from LiveData to MVI:

```kotlin
// Before: LiveData
private var _userList = MutableLiveData<List<User>>()
val userListLiveData = _userList.value ?: emptyList()

// After: MVI with StateFlow
sealed class UserState {
    data object Idle : UserState()
    data object Loading : UserState()
    data class Success(val users: List<User>) : UserState()
    data class Error(val message: String) : UserState()
}

class UserViewModel(private val repository: UserRepository) : ViewModel() {
    private var _state = UserState.Idle
    
    val state = MutableSharedFlow<UserState>()
    
    fun loadUsers() {
        viewModelScope.launch {
            repository.fetchUsers()
                .collect { users ->
                    _state = UserState.Success(users)
                    state.emit(_state)  // Observable to LiveData
                }
        }
    }
}
```

## Conclusion

MVI architecture brings enterprise-grade software engineering practices to Android development. By separating concerns, using immutable state, and embracing unidirectional data flow, you create maintainable, testable, and performant applications that scale with your team.

The initial setup requires more boilerplate than traditional LiveData approaches, but the long-term benefits in code clarity, developer experience, and testability make it worth it for medium-to-large Android projects.

---
*Happy coding!*
