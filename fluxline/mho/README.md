# Mho: Ohmentum's AI study partner (standalone test version)

Mho is a chat tutor for Ohmentum students. This folder is a **separate test app**: it has its own
page and server and is not connected to the main site, its accounts or its subscriptions.

What it does:
- Answers EE, math and physics questions, pitched to the student's level, with math rendered like the lessons.
- **Follows a lesson:** pick a course and lesson at the top, and Mho reads that lesson's full text, so it
  uses the same notation and examples. It knows the answers to the lesson's practice problems but is told
  not to give them away until the student has tried.
- Quick actions: *Explain it another way*, *Give me a hint*, *Check my work*, *Quiz me*.
- Hint-first teaching: guides before solving; gives the full solution when asked directly or after an attempt.
- Stays on topic, sends account and billing questions to the Contact page, and won't solve graded exam questions.

Mho's personality and rules live in `src/prompt.ts`. Edit that file to change how it teaches.

## Run it locally

```bash
cd mho
npm install
npm start            # http://localhost:8795
```

Without an API key it runs in **test mode** and gives a canned reply, so you can try the page for free.
For real answers, create `mho/.env` (it's never committed):

```
ANTHROPIC_API_KEY=your key from console.anthropic.com
MHO_ACCESS_CODE=pick-a-code
```

## Put it online for testing (Render)

Create a **new** Web Service from the same GitHub repo (separate from the main site):

| Setting | Value |
|---|---|
| Root Directory | `fluxline/mho` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Environment | `NODE_ENV=production`, `ANTHROPIC_API_KEY`, `MHO_ACCESS_CODE` |

`MHO_ACCESS_CODE` is required in production. Anyone you share the link with needs the code, so strangers
can't run up your bill. The page is also marked "noindex" so search engines skip it.

## Settings

| Variable | Default | What it does |
|---|---|---|
| `ANTHROPIC_API_KEY` | none | Your Claude API key. Without it, test mode. |
| `MHO_ACCESS_CODE` | none | Code people must enter to use Mho. Required in production. |
| `MHO_DAILY_LIMIT` | 300 | Most messages the whole server answers per day (UTC), to cap spending. |
| `MHO_MODEL` | `claude-opus-5-5` | The Claude model. |
| `MHO_EFFORT` | `medium` | How hard the model thinks: `low`, `medium` or `high`. Lower is faster and cheaper. |
| `MHO_MOCK` | off | Set to `1` to force test mode even with a key. |

Each visitor is also limited to 30 messages per 10 minutes.

## Cost

Each reply is logged with its token counts and an estimated cost, like
`[mho] claude-opus-5-5 in=12 cache_write=2400 cache_read=0 out=650 ~$0.025`.
Expect roughly **2 to 4 cents per message** on Claude Opus 5.5. Follow-up messages in the same chat cost
less, because Mho's instructions, the lesson and the earlier conversation are read from the prompt cache
at a tenth of the price. With the default daily cap of 300 messages, the worst case is about $10 a day.
Set a monthly spend limit in the Anthropic Console as a second safety net.

If Claude declines a harmless question (safety filters occasionally misfire on engineering topics),
the API retries on a fallback model automatically (`fallbacks: "default"`).
