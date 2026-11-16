# MediCare

MediCare is a healthcare appointment-management application built with Next.js. It provides a patient-facing registration and appointment-booking flow and an admin dashboard for reviewing, scheduling, and cancelling appointments.

The application uses Appwrite for user management, database persistence, file storage, and SMS messaging, while Sentry is integrated for application error monitoring.

> **Project status:** This README documents the current implementation in the repository. Before deploying to production, review the security and privacy considerations below, especially the admin passkey flow and handling of medical information.

## Features

### Patient experience

- Create or retrieve a patient account using:
  - Full name
  - Email address
  - International-format phone number
- Complete a detailed patient profile:
  - Personal information and date of birth
  - Gender, address, and occupation
  - Emergency contact details
  - Primary physician
  - Insurance provider and policy number
  - Allergies, current medication, and medical history
  - Identification type, number, and uploaded document
  - Treatment, disclosure, and privacy consents
- Select a doctor from the configured doctor directory.
- Request an appointment by selecting:
  - Doctor
  - Date and time
  - Reason
  - Optional notes
- View an appointment confirmation page after a successful request.

### Administrator experience

- Open the admin access flow from the patient landing page.
- Authenticate with the configured six-character admin passkey.
- View appointment totals for:
  - Scheduled appointments
  - Pending appointments
  - Cancelled appointments
- Review appointments in a data table containing patient, status, date/time, and doctor information.
- Schedule pending appointments.
- Cancel appointments with a cancellation reason.
- Send an SMS notification when an appointment is scheduled or cancelled.

### Platform features

- Next.js App Router with server components and server actions.
- Responsive layouts for patient forms and appointment pages.
- Reusable form controls built on React Hook Form and Zod.
- File uploads to an Appwrite storage bucket.
- Light/dark theme support through `next-themes`.
- Sentry client, server, and edge instrumentation.
- Tailwind CSS v4 styling with Radix UI primitives.

## Technology stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 15.4.5 |
| Language | TypeScript |
| UI runtime | React 19 |
| Styling | Tailwind CSS v4, `tw-animate-css` |
| Forms | React Hook Form, Zod, `@hookform/resolvers` |
| UI primitives | Radix UI |
| Tables | TanStack React Table |
| Backend services | Appwrite |
| File uploads | Appwrite Storage |
| Notifications | Appwrite Messaging |
| Monitoring | Sentry for Next.js |
| Icons and animation | Lucide React, Framer Motion |
| Package manager | npm-compatible; `package-lock.json` is recommended |

## Application flow

### Patient booking flow

1. A patient opens `/`.
2. The patient submits their name, email, and phone number.
3. MediCare creates the Appwrite user, or retrieves the existing user when the email already exists.
4. The patient completes the registration form at `/patients/[userId]/register`.
5. The patient information is stored in Appwrite and an optional identification document is uploaded to Appwrite Storage.
6. The patient is redirected to `/patients/[userId]/new-appointment`.
7. The patient selects a doctor, date/time, reason, and optional note.
8. The appointment is stored with `pending` status.
9. The patient is redirected to `/patients/[userId]/new-appointment/success?appointmentId=...`.

### Admin appointment flow

1. An administrator opens `/Home/?admin=true`.
2. The `Passkey` component validates the configured admin passkey.
3. A locally stored encrypted access key allows the administrator to return to the dashboard without entering the key again.
4. The administrator is redirected to `/admin`.
5. The dashboard reads recent appointments from Appwrite and calculates status totals.
6. The administrator can schedule or cancel an appointment.
7. The appointment is updated and an SMS notification is attempted through Appwrite Messaging.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Patient entry point for creating or retrieving a user |
| `/Home` | Home/patient entry page; the current admin link targets `/Home/?admin=true` |
| `/Home/?admin=true` | Opens the admin passkey verification dialog |
| `/patients/[userId]/register` | Patient registration and medical-information form |
| `/patients/[userId]/new-appointment` | New appointment request form |
| `/patients/[userId]/new-appointment/success` | Appointment confirmation page |
| `/admin` | Admin dashboard and appointment table |
| `/api/sentry-example-api` | Sentry example route used for monitoring/testing |

The project currently contains both `app/page.tsx` and `app/Home/page.tsx`. Keep route casing consistent when adding links because route casing can behave differently between local development and case-sensitive production environments.

## Project structure

```text
app/
  page.tsx                         # Root patient entry route
  Home/page.tsx                    # Patient form and admin entry link
  admin/page.tsx                   # Admin dashboard
  patients/[userId]/
    register/page.tsx              # Patient registration route
    new-appointment/page.tsx       # Appointment creation route
    new-appointment/success/       # Confirmation route
  api/sentry-example-api/          # Example API route
  layout.tsx                       # Global metadata, theme, and layout
  globals.css                      # Global styles

components/
  AppointmentModal.tsx             # Admin schedule/cancel modal
  FileUploader.tsx                 # Identification document uploader
  Passkey.tsx                      # Admin passkey dialog
  Statcard.tsx                     # Dashboard status card
  StatusBadge.tsx                  # Appointment status display
  SubmitButton.tsx                 # Loading-aware form submit button
  table/                           # Appointment data table and columns
  ui/                              # Reusable controls and form components
    forms/
      Patientform.tsx              # Initial patient/user form
      Registerform.tsx             # Detailed patient form
      Appointmentform.tsx          # Create/schedule/cancel form

constants/index.ts                 # Doctors, genders, statuses, defaults
lib/
  appwrite.config.ts               # Appwrite SDK clients and environment mapping
  UserFormValidation.ts            # Zod schemas
  utils.ts                         # Shared formatting and utility functions
  actions/
    patient.action.ts              # User, patient, and file operations
    appointment.actions.ts          # Appointment and SMS operations

types/
  index.d.ts                       # Shared TypeScript declarations
  apwrite.types.ts                 # Appwrite document types
public/
  icons/                           # UI icons
  *.png, *.jpg, *.gif              # Doctor and page imagery
instrumentation*.ts                # Sentry instrumentation
```

## Prerequisites

- Node.js 20 or a compatible current LTS release.
- npm.
- An Appwrite project with:
  - A database
  - Patient and appointment collections
  - A storage bucket for identification documents
  - Messaging/SMS capability configured for the deployment
- An Appwrite API key with only the permissions required by the server actions.
- A Sentry project if error monitoring is required.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root. Do not commit this file.

```env
# Appwrite server configuration
PROJECT_ID=your_appwrite_project_id
API_KEY=your_appwrite_server_api_key
DATABASE_ID=your_appwrite_database_id
PATIENT_COLLECTION_ID=your_patient_collection_id
DOCTOR_COLLECTION_ID=your_doctor_collection_id
APPOINTMENT_COLLECTION_ID=your_appointment_collection_id

# These values are read by the application
NEXT_PUBLIC_APPWRITE_URL=https://cloud.appwrite.io/v1
NEXT_PUBLIC_BUCKET_ID=your_appwrite_storage_bucket_id

# Used by the current client-side admin passkey implementation
NEXT_PUBLIC_ADMIN_PASSKEY=your_six_character_passkey
```

`DOCTOR_COLLECTION_ID` is exposed by the Appwrite configuration module but the current appointment and patient actions use the doctor list defined in `constants/index.ts`. Keep the variable configured if your Appwrite setup or future implementation requires it.

### 3. Configure Appwrite

Create the resources referenced by the environment variables:

1. Create an Appwrite project and copy its project ID.
2. Copy the project endpoint into `NEXT_PUBLIC_APPWRITE_URL`.
3. Create a database and set `DATABASE_ID`.
4. Create the patient and appointment collections and set their collection IDs.
5. Create a storage bucket and set `NEXT_PUBLIC_BUCKET_ID`.
6. Create an API key for server-side operations and set `API_KEY`.
7. Configure the required collection attributes and permissions for the server actions.
8. Configure SMS messaging if appointment notifications are needed.

The exact Appwrite attribute types must match the values submitted by the forms. At minimum, the patient collection needs fields for the registration values and the appointment collection needs fields for user, patient, physician, schedule, reason, note, status, and cancellation reason.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev      # Start Next.js with Turbopack
npm run build    # Create a production build
npm run start    # Start the production server after building
npm run lint     # Run the configured lint command
```

For a production-like local run:

```bash
npm run build
npm run start
```

## Data and server actions

Appwrite access is centralized in `lib/appwrite.config.ts`, which creates the database, storage, messaging, and users SDK clients. Server actions are grouped by domain:

### Patient actions

`lib/actions/patient.action.ts` provides:

- `createUser`: creates an Appwrite user and retrieves an existing user on email conflict.
- `getUser`: loads a user by ID.
- `getPatient`: loads a patient document for a user.
- `registerPatient`: uploads an identification file when supplied and creates the patient document.

### Appointment actions

`lib/actions/appointment.actions.ts` provides:

- `CreateAppointment`: creates a pending appointment.
- `getAppointment`: loads one appointment for the confirmation page.
- `getRecentAppointmentList`: retrieves appointments and calculates status counts.
- `updateAppointment`: schedules or cancels an appointment and triggers an SMS attempt.
- `sendSms`: sends an Appwrite Messaging SMS.

Errors are currently logged to the server console by these actions. Production deployments should add user-safe error responses and structured monitoring without exposing medical or credential data.

## Validation rules

The main form schemas are defined in `lib/UserFormValidation.ts`:

- Initial user registration requires a valid name, email, and international-format phone number.
- Patient registration validates personal, contact, medical, and consent fields.
- All three consent checkboxes must be selected before registration completes.
- Appointment creation requires a doctor, schedule, and reason.
- Appointment cancellation requires a cancellation reason.
- Scheduling and cancellation use the `scheduled` and `cancelled` statuses respectively; new requests use `pending`.

## Admin access and security notes

The current admin flow is intended as a simple application demonstration, not a complete production authentication system:

- The passkey is read from `NEXT_PUBLIC_ADMIN_PASSKEY`, which means it is available to client-side code.
- The passkey is stored in browser local storage after client-side encryption.
- The `/admin` page and its server actions do not currently show a server-side session or role check.
- Appwrite API credentials must remain server-only; never prefix them with `NEXT_PUBLIC_`.
- Patient medical information and identification documents are sensitive data. Use least-privilege Appwrite permissions, HTTPS, appropriate retention policies, audit logging, and a compliant identity/access-management solution before production use.

For production, replace the client-side passkey gate with server-validated authentication and authorization, protect every admin route/action, rotate credentials, and review the Appwrite bucket and collection permissions.

## Monitoring

Sentry is initialized in:

- `instrumentation-client.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`

`instrumentation.ts` loads the correct server or edge configuration based on `NEXT_RUNTIME`. The repository currently contains a Sentry DSN in the configuration files. Review whether that DSN should be replaced with a project-specific environment configuration before distributing or deploying the application.

## Deployment

The application can be deployed to a Next.js-compatible host such as Vercel or a Node.js server:

1. Provision and configure Appwrite.
2. Add all required environment variables to the hosting provider.
3. Run `npm run build` in CI or during deployment.
4. Start with `npm run start` when using a Node.js server.
5. Confirm the deployment can reach the Appwrite endpoint.
6. Verify patient registration, file upload, appointment creation, admin scheduling, cancellation, and SMS behavior.
7. Confirm Sentry receives a controlled test event.

Do not expose `API_KEY` or other server credentials in browser bundles, logs, screenshots, or source control. Configure the production domain and Appwrite permissions explicitly rather than relying on broad development permissions.

## Troubleshooting

### Appwrite requests fail

- Confirm `NEXT_PUBLIC_APPWRITE_URL` includes the correct Appwrite API endpoint.
- Verify project, database, collection, and bucket IDs.
- Confirm the API key has access to the required resources.
- Check the server logs for the failing server action.

### Registration does not continue

- Ensure the email and phone values satisfy the Zod schema.
- Confirm all required consent checkboxes are selected.
- Check that the patient collection contains every required attribute.
- Confirm the storage bucket is available when an identification document is uploaded.

### Appointment confirmation is empty

- Confirm the appointment was created successfully.
- Check that the URL contains a valid `appointmentId` query parameter.
- Verify the doctor name stored on the appointment matches an entry in `constants/index.ts`.

### Admin dashboard does not load

- Verify the admin passkey matches `NEXT_PUBLIC_ADMIN_PASSKEY`.
- Clear the browser's stored `accessKey` and try again after changing the passkey.
- Confirm the appointment collection can be listed by the configured Appwrite API key.

## Development guidelines

- Keep Appwrite operations in server actions or other server-only modules.
- Validate user input with the existing Zod schemas before persistence.
- Reuse components from `components/ui` instead of duplicating form controls.
- Add new doctors and their images through `constants/index.ts` and `public/`.
- Keep status values consistent with `pending`, `scheduled`, and `cancelled`.
- Avoid logging patient records, uploaded documents, API keys, or passkeys.
- Test both successful and failure paths when changing a server action.

## License

No license file is currently included in the repository. Add a license before publishing or redistributing the project.
