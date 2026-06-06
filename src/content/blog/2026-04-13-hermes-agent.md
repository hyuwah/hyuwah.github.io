---
title: "How to Set Up Hermes Agent on Windows (WSL2), Linux VPS, and macOS"
description: "Complete installation guide for Hermes Agent — a self-learning AI with built-in learning loop. Setup on WSL2, Linux servers, or Mac OS X."
pubDate: 2026-04-13T08:00:00Z
tags: [AI Agents, Hermes, Installation, Windows, Linux, macOS]
---

Hermes Agent is an AI agent that learns from its own experiences. It has a **closed learning loop** — it creates new skills from past tasks, improves itself while you use it, and remembers who you are across chat sessions.

If you want to try something cool without the hassle of setting up laptops or expensive cloud servers, Hermes is the answer. It runs on small laptops, $5/month VPS, or GPU clusters — if idle it costs almost nothing.

## What is Hermes Agent?

Hermes isn't just a regular chatbot. It's an AI agent with self-managed memory:

- **Self-improving** — creates new skills from past experiences
- **Persistent memory** — remembers who you are and your preferences across sessions
- **Closed learning loop** — learns from errors, no need to be reprogrammed
- **Multi-platform** — works in terminal CLI, Telegram, Discord, Slack, WhatsApp, Signal, or Email

It can run in terminal CLI or as a chatbot on messaging platforms. If you use open-source models, this is a great way to test AI local capabilities without expensive API keys.

## Installation

The quickest way to get started is the official one-liner installer that works across all platforms:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

This installer automatically detects your platform and handles all dependencies (Python, Node.js, ripgrep, ffmpeg). Works on Linux, macOS, WSL2, and Android via Termux.

After installation, reload your shell and start chatting:

```bash
source ~/.bashrc  # or ~/.zshrc
hermes            # Start chatting!
```

### Platform-Specific Notes

**Windows:** Native Windows is not supported. Install [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) and run the command above inside it.

**macOS:** Native support — no WSL needed. The installer handles everything including Python 3.11 and Node.js v22.

**Linux VPS:** Works on Ubuntu 20.04/22.04/24.04, Debian 12+, Fedora, and Arch. Minimum 2GB RAM recommended (4GB+ for best performance).

**Android/Termux:** Supported! Run the installer inside Termux. Note that browser/WhatsApp tooling requires additional manual setup.

## Configuration

The easiest way to configure Hermes is the interactive setup wizard:

```bash
hermes setup
```

This will guide you through:
- Choosing your LLM provider and model
- Setting up API keys
- Configuring messaging platforms (Telegram, Discord, etc.)
- Setting your preferred personality

### LLM Provider Options

- **OpenRouter** (recommended) — 200+ models, free tier available
- **Nous Portal** — Nous Research's own model endpoint
- **Local deployment** (Ollama + vLLM) — for privacy and offline access
- **OpenAI, Anthropic** — use your own API keys
- **z.ai/GLM, Kimi/Moonshot, MiniMax** — alternative providers

### Setting API Keys Manually

Create or edit `~/.hermes/.env`:

```bash
nano ~/.hermes/.env
```

Add your API key:

```bash
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

Or use the CLI:

```bash
hermes config set OPENROUTER_API_KEY sk-or-v1-your-key-here
```

### Choosing a Model

```bash
hermes model                    # Interactive model selector
hermes model openrouter:ollama/mistral-7b  # Direct model selection
```

## Messaging Gateway

One of Hermes's coolest features is the messaging gateway — talk to your AI agent from Telegram, Discord, Slack, WhatsApp, Signal, or even Email:

```bash
hermes gateway setup   # Configure messaging platforms
hermes gateway start   # Start the gateway
```

### Supported Platforms

- **Telegram** — Bot API
- **Discord** — Bot with slash commands
- **Slack** — App integration
- **WhatsApp** — QR code pairing
- **Signal** — Bot integration
- **Email** — IMAP/SMTP
- **Home Assistant** — Smart home integration

## Key Commands

```bash
hermes              # Interactive CLI — start a conversation
hermes setup        # Run the full setup wizard
hermes model        # Choose your LLM provider and model
hermes tools        # Configure which tools are enabled
hermes config       # View/edit configuration
hermes config edit  # Open config in your editor
hermes gateway      # Start messaging gateway
hermes update       # Update to the latest version
hermes doctor       # Diagnose any issues
hermes version      # Check version
```

### Slash Commands (in chat)

- `/new` or `/reset` — Start fresh conversation
- `/model [provider:model]` — Change model
- `/personality [name]` — Set personality
- `/retry`, `/undo` — Retry or undo last turn
- `/compress`, `/usage` — Compress context / check usage
- `/skills` — Browse available skills
- `/stop` — Interrupt current work (messaging platforms)

## Features to Explore

Once Hermes is running, check out these powerful features:

1. **Skill Creation** — Ask Hermes to create new skills for your routine tasks
2. **Cron Scheduling** — Set up daily/weekly automated tasks
3. **MCP Integration** — Connect any MCP server for extended capabilities
4. **Memory System** — Persistent memory with user profiles
5. **Context Files** — Project context that shapes every conversation
6. **OpenClaw Migration** — Import settings from OpenClaw if you used it

## Troubleshooting

### `hermes: command not found`

Reload your shell config:

```bash
source ~/.bashrc  # Bash
source ~/.zshrc   # Zsh (macOS default)
```

### API Key Errors

```bash
hermes config check                              # Check configuration
hermes config set OPENROUTER_API_KEY your-key    # Update API key
```

### Memory Issues

Hermes needs sufficient RAM:
- **2GB** — Minimum, but slower
- **4GB+** — Can run multiple models
- **16GB+** — Recommended for production

### Slow Performance

```bash
htop  # Check resource usage
```

Reduce context window if needed:

```bash
hermes config set CONTEXT_WINDOW 30000
```

## References

- [Official Documentation](https://hermes-agent.nousresearch.com/docs/)
- [CLI Reference](https://hermes-agent.nousresearch.com/docs/reference/cli-commands)
- [Discord Community](https://discord.gg/NousResearch)
- [GitHub Repository](https://github.com/NousResearch/hermes-agent)
- [Skills Hub](https://agentskills.io)

Happy coding! 🚀