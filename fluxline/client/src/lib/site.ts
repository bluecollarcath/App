// Business details used on the legal and contact pages. Set these as environment variables
// at build time (on Render: Environment → add the VITE_* keys, then redeploy).
const env = import.meta.env;

export const SITE = {
  name: 'Ohmentum',
  /** The legal name of the business that runs the site, e.g. "Ohmentum LLC". */
  legalName: (env.VITE_LEGAL_NAME as string | undefined) || 'Ohmentum',
  /** e.g. "the State of Texas". Leave unset to use a general clause. */
  governingLaw: (env.VITE_GOVERNING_LAW as string | undefined) || '',
  /** Where disputes are heard, e.g. "Jefferson County, Alabama". Leave unset to omit the clause. */
  disputeVenue: (env.VITE_DISPUTE_VENUE as string | undefined) || '',
  /** Mailing address shown in the Privacy Policy (optional). */
  postalAddress: (env.VITE_POSTAL_ADDRESS as string | undefined) || '',
  /** Date the current legal pages took effect. Update it whenever you change them. */
  legalEffectiveDate: 'November 7, 2026',
  refundWindowDays: 14,
  /** Public launch: midnight Central time, January 4, 2027. The countdown and top bar key off this. */
  launchAt: '2027-01-04T00:00:00-06:00',
  /** When the countdown battery started charging (0%): the first line of Ohmentum's code. */
  chargeStart: '2026-11-03T00:00:00-06:00',
  /** How long after launch the home page keeps saying "We're live." */
  liveBannerDays: 14,
};
