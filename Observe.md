Set up NestJS Observe (APM for NestJS) in this repository. The application is registered in Observe as "nest-template", in the project "nest-template".

## Before you start

- The SDK needs `@nestjs/core` >= 11.1.4. Check the installed version first. If it is older, stop and tell me instead of upgrading Nest on your own - earlier versions lack the hooks the SDK instruments through, so nothing would be reported.
- If this is a monorepo, ask me which NestJS application to instrument before changing anything.

## 1. Install the SDK

```bash
npm install @nestjs/observe
```

## 2. Add the credentials

Add these two variables to the `.env` file the application loads (create it if there is none), and make sure that file is git-ignored. Never commit them, and do not put the values anywhere else in the codebase.

```bash
OBSERVE_APP_KEY=&^26hx%kfKhohQ5j
OBSERVE_APP_SECRET='q1TE%c2kUCXyKrCe&dSkdclgBD4AccEB&O6&GD&FY&c%y'
```

The values are read from `process.env` when `AppModule` is evaluated, so the file has to be loaded before that. If the project does not already load it (`@nestjs/config`, `dotenv`, `node --env-file=.env`), add `import "dotenv/config";` as the first line of `main.ts` or use whatever mechanism the project already has.

## 3. Make exactly these three edits

**`src/observe.ts`** (new file) - creates the module and its matching `instrument` hook:

```ts
import { createObserveModule } from "@nestjs/observe";

export const { ObserveModule, ObserveInstrument } = createObserveModule();
```

**`src/app.module.ts`** - add `ObserveModule.forRoot(...)` to the root module's existing `imports`. Keep everything that is already there:

```ts
import { ObserveModule } from "./observe";

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY,
      appSecret: process.env.OBSERVE_APP_SECRET,
      serviceId: "nest-template",
    }),
  ],
})
export class AppModule {}
```

Keep `serviceId` exactly `"nest-template"` - it is the name this service reports under.

**`src/main.ts`** - pass `instrument` to the existing `NestFactory.create` call. Keep its type parameter and any options it already has:

```ts
import { ObserveInstrument } from "./observe";

const app = await NestFactory.create(AppModule, {
  instrument: ObserveInstrument,
});
```

Adjust the import paths if the root module or `main.ts` live somewhere else. Do not add anything beyond these edits - no custom spans, no extra configuration.

## 4. Verify

1. Make sure the project still compiles.
2. Start the application with `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` set, and make at least one HTTP request to it.
3. There is nothing to check locally beyond the app starting cleanly and logging no Observe authentication errors. The Observe dashboard picks up the first event within about a minute - tell me when the request has been made, and I will confirm it arrived.
