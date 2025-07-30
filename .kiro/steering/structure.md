# Project Structure

## Current Organization
```
.
├── .git/           # Git version control
├── .kiro/          # Kiro AI assistant configuration
│   └── steering/   # AI guidance documents
└── README.md       # Project documentation (currently empty)
```

## Recommended Structure Patterns
When expanding the project, follow these conventions:

### Source Code Organization
```
src/                # Main source code
├── main/          # Application entry points
├── lib/           # Reusable libraries/modules
└── utils/         # Utility functions

tests/             # Test files
├── unit/          # Unit tests
├── integration/   # Integration tests
└── fixtures/      # Test data and mocks
```

### Configuration & Documentation
```
docs/              # Additional documentation
config/            # Configuration files
scripts/           # Build and utility scripts
.gitignore         # Git ignore patterns
LICENSE            # Project license
```

## File Naming Conventions
- Use lowercase with hyphens for directories: `my-feature/`
- Follow language-specific conventions for source files
- Keep names descriptive but concise
- Use consistent extensions (.js, .py, .rs, etc.)

## Guidelines
- Keep the root directory clean - move complex structures into subdirectories
- Separate source code from configuration and documentation
- Use conventional names that other developers will recognize
- Update README.md to document any custom structure decisions
- Consider using a .gitignore file appropriate for your chosen technology stack