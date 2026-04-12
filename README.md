# Daily Bible Verse App Spec

## Product Overview

Build a simple mobile app that sends one daily Bible verse notification at the user’s chosen time.

This is an MVP. Keep it small, peaceful, and easy to use.

The app should let a user:

* enter their name
* choose a preferred daily notification time
* receive one daily local notification
* open the app and see the verse of the day
* tap a button to read more

## Main Goal

Create a lightweight encouragement app with no backend required for version 1.

## MVP Features

Included in version 1:

* onboarding screen
* name input
* daily time picker
* local storage of user settings
* one recurring local notification per day
* home screen showing the daily verse
* verses stored in a local JSON file
* Read More button
* detail screen with full verse and short reflection
* settings screen to update name and time

Not included in version 1:

* SMS
* user accounts
* cloud sync
* favorites
* sharing
* categories
* streaks
* subscriptions
* backend database

## Recommended Tech Stack

* React Native with Expo
* expo-notifications for local notifications
* AsyncStorage for local saved settings
* local JSON file for verse data
* Expo Router or React Navigation

## Core User Flow

### First Launch

1. User opens the app.
2. User sees a setup screen.
3. User enters their name.
4. User selects a preferred daily notification time.
5. User taps Save.
6. App stores settings locally.
7. App schedules a daily local notification.
8. App opens the home screen.

### Daily Use

1. User receives the daily notification.
2. User taps it.
3. App opens to Today’s Verse.
4. User reads the verse.
5. User taps Read More.
6. App shows the detail screen with reflection.

## Screens

### 1. Setup Screen

Purpose: collect minimum setup information.

UI elements:

* app title
* short welcome text
* name input field
* time picker
* save button

Behavior:

* name cannot be empty
* selected time is required
* on save, store settings and schedule notification

### 2. Home Screen

Purpose: show the daily verse.

UI elements:

* greeting using user name
* current date
* verse text
* verse reference
* Read More button
* Settings button

Behavior:

* load the verse of the day
* keep the same verse for the whole calendar day

### 3. Verse Detail Screen

Purpose: show more information.

UI elements:

* verse reference
* full verse text
* short reflection
* back button

### 4. Settings Screen

Purpose: let the user edit preferences.

UI elements:

* editable name
* time picker
* save changes button

Behavior:

* update saved values
* reschedule notification if time changes

## Functional Requirements

### FR1

The app must let the user enter their name.

### FR2

The app must let the user select a preferred notification time.

### FR3

The app must store the user’s name and notification time locally on the device.

### FR4

The app must schedule one recurring local notification each day.

### FR5

The app must show one verse per day on the home screen.

### FR6

The app must keep the same verse for the same day.

### FR7

The app must allow the user to tap Read More to view a detail screen.

### FR8

The app must allow the user to edit their name and notification time later.

### FR9

The app must work offline after installation.

## Non-Functional Requirements

* simple and calm design
* easy setup in under one minute
* clear navigation
* no internet required for the MVP
* modular code so future backend support can be added later

## Data Model

Use a local JSON file for verses.

Example:

```json
[
  {
    "id": 1,
    "reference": "Philippians 4:13",
    "text": "I can do all things through Christ who strengthens me.",
    "reflection": "This verse reminds us that our strength comes from Christ."
  },
  {
    "id": 2,
    "reference": "Jeremiah 29:11",
    "text": "For I know the plans I have for you, declares the Lord...",
    "reflection": "God is still working with purpose even when life feels uncertain."
  }
]
```

## Local Storage Keys

Suggested keys:

* userName
* notificationHour
* notificationMinute
* lastVerseDate
* lastVerseId

## Verse of the Day Logic

The verse should stay stable for the whole day.

Recommended logic:

* when the app opens, get today’s date
* compare it to lastVerseDate
* if the dates match, load lastVerseId
* if the dates do not match, choose a new verse and save it

For MVP, cycle through verses in order instead of using random selection.

## Notification Content

Example notification:

* Title: Daily Bible Verse
* Body: Your verse for today is ready.

Optional personalized version:

* Title: Good morning, {name}
* Body: Your daily verse is ready.

## Design Direction

The app should feel:

* peaceful
* clean
* warm
* minimal

Suggested style:

* soft background colors
* readable typography
* rounded cards
* subtle accent color
* uncluttered layout

Avoid anything too flashy or busy.

## Edge Cases

* if the user denies notification permission, the app should still work in-app
* if notifications are denied, show a friendly message explaining that reminders are off
* if the verse file is empty, show a fallback message instead of crashing
* if saved time data is invalid, prompt the user to choose a time again

## Success Criteria

The MVP is successful if:

* setup works
* name and time save correctly
* one daily local notification is scheduled
* the verse of the day loads correctly
* Read More opens the detail screen
* the app works offline

## Future Enhancements

Possible later additions:

* push notifications from a server
* SMS support
* favorites
* categories like hope, peace, strength
* sharing
* reading streaks
* devotionals
* Firebase or Supabase backend

## Build Prompt for Antigravity

Build a simple React Native Expo mobile app where the user enters their name and preferred daily reminder time, the app stores those settings locally, schedules one daily local notification, loads a stable Bible verse of the day from a local JSON file, shows that verse on the home screen, and provides a Read More screen with a short reflection.
