// Business details used on the legal and contact pages. Set these as environment variables
// at build time (on Render: Environment → add the VITE_* keys, then redeploy).
const env = import.meta.env;

export const SITE = {
  name: 'Fluxline',
  /** The legal name of the business that runs the site, e.g. "Fluxline LLC". */
  legalName: (env.VITE_LEGAL_NAME as string | undefined) || 'Fluxline',
  /** e.g. "the State of Texas". Leave unset to use a general clause. */
  governingLaw: (env.VITE_GOVERNING_LAW as string | undefined) || '',
  /** Mailing address shown in the Privacy Policy (optional). */
  postalAddress: (env.VITE_POSTAL_ADDRESS as string | undefined) || '',
  /** Date the current legal pages took effect. Update it whenever you change them. */
  legalEffectiveDate: 'November 3, 2026',
  refundWindowDays: 14,
};
