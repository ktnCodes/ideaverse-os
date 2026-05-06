# Contributing to ideaverse-os

Thanks for the interest. ideaverse-os is in active early development (`v0.x`); the architecture is being grilled out via vertical slices.

## Status

- **Spec:** [PRD](https://github.com/ktnCodes/ideaverse-os/blob/main/docs/PRD.md) and [Tasks](https://github.com/ktnCodes/ideaverse-os/blob/main/docs/TASKS.md)
- **Roadmap:** 7 vertical slices to v1.0. Slice 1 (tracer) is currently in flight.
- **Site:** https://ideaverse-os.ktncodes.com

## Local development

```bash
git clone https://github.com/ktnCodes/ideaverse-os.git
cd ideaverse-os
npm install
npm run dev -- init ~/test-vault
```

To test the CLI as if installed globally:

```bash
npm link
ideaverse-os init ~/test-vault
```

## Pull requests

Before opening a PR:

1. Make sure the change maps to a task in `docs/TASKS.md`. If it does not, open an issue first.
2. Run `npm run build` to verify TypeScript compiles.
3. Keep changes vertical (CLI + skills + site if relevant) per the slice methodology.

Code style follows the patterns set by the [impeccable](https://github.com/anthropic/impeccable) skill and [soul.md](https://github.com/ktnCodes/ideaverse-os/blob/main/docs/soul.md) communication rules.

## Issues

File issues with concrete reproduction steps. For architecture discussions, link to the relevant decision in the PRD's Appendix A.

## License

By contributing, you agree your contributions are licensed under MIT.
