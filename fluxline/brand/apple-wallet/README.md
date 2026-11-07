# Ohmentum Apple Wallet card

`wallet-preview.png` shows how the pass looks. Apple Wallet only accepts passes signed with an
Apple Developer certificate, so use one of the two routes below.

## Option 1 (easiest): a pass-maker app or service

Use an app or website that creates and signs Wallet passes for you (for example Pass2U Wallet,
or a digital business card app with "Add to Apple Wallet"; check the free plan includes it).
Upload and paste:

| Field in the tool | Use |
|---|---|
| Background color | `#07140E` (rgb 7, 20, 14) |
| Text / value color | `#FFFFFF` |
| Label color | `#3AE896` (rgb 58, 232, 150) |
| Logo | `logo@3x.png` (or `logo@2x.png` / `logo.png` if it asks for exact sizes) |
| Icon | `icon@3x.png` |
| Strip / banner / hero image | `strip@3x.png` |
| Thumbnail (if asked) | `thumbnail@3x.png` (the round emblem) |
| Organization / title | `Ohmentum` |
| Fields | FREE: `$0` · MONTHLY: `$29/mo` · ANNUAL: `$249/yr` · FOUNDING MEMBER: `$15/mo or $129/yr, while spots last` |
| Barcode | QR code, content `https://www.ohmentum.com`, caption `www.ohmentum.com` |
| Back of pass | Website, about, plans and contact text from `pass.json` (`backFields`) |

## Option 2: your own signed pass (Apple Developer Program, $99/year)

1. In the Apple Developer portal, create a **Pass Type ID** (e.g. `pass.com.ohmentum.card`) and its
   certificate, and note your **Team ID**.
2. In `pass.json`, set `passTypeIdentifier` and `teamIdentifier` to yours.
3. Sign this folder's files (`pass.json` and the PNGs, not this README or the preview) into a
   `.pkpass` with Apple's `signpass` tool or a library such as `passkit-generator`.
   Keep the certificate private; never commit it.
4. Open the `.pkpass` on an iPhone (AirDrop, email or a web link) and tap **Add**.

If prices change, update the fields (and `pass.json`) and re-issue the pass.
