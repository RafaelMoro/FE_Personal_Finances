## v0.5.0 (2024-03-30)
Release Changes.
- Fix time that was set incorrectly when creating record

### Pull Requests
[#9](hhttps://github.com/RafaelMoro/FE_Personal_Finances/pull/9) | Fix timezone

## v0.5.0 (2024-03-29)
Release Changes
- Create a transfer
- Edit a transfer
- Delete a transfer
- When linking expenses, only records and incomes are shown omiting transfers.
- Fix on timezone when creating a record.

### Pull Requests
[#8](hhttps://github.com/RafaelMoro/FE_Personal_Finances/pull/8) | Add Transfer Feature

## v0.4.0 (2024-03-18)
Release Changes
- Fix all tests written by wrapping it with Redux
- Install jest fetch mocks dependency to mock RTK queries
- Add data test id to action button panel to submit button
- Fix errors of pnpm on not recognizing jest-dom methods

### Pull Requests
[#6](hhttps://github.com/RafaelMoro/FE_Personal_Finances/pull/6) | Fix tests that were not working properly

## v0.3.0 (2024-03-16)
Release Changes
- Fix accesibility issue on log out icon button, edit and remove icon button on account.
- Fix: Select expenses table was having horizontal overflow. For mobile, the date field was removed.
- Fix Accesibility issue on subtitle color was not having enough contrast
- Fix font sizes and icon sizes shown in the date time picker
- Create local categories on create user
- Create local categories if the user logins and there are no local categories
- Apply theme spacing to flex container component
- Refactor categories and subcategories to fetch categories only and do not show hardcoded local categories
- Fix create user query fired twice.

### Pull Requests
[#5](hhttps://github.com/RafaelMoro/FE_Personal_Finances/pull/5) | Multiple fixes v2.1.0 

## v0.2.0 (2024-03-10)
Release Changes
- Change validation for limit of characters for short description and description
- Add spacing to the theme
- Change font sizes for mobile
- Redesign record for all devices
- Redesign record drawer for all devices
- Refactor icons component
- Add icons to category
- Add limit to validation on adding tags or budgets to 8 maximum

### Pull Requests
[#3](hhttps://github.com/RafaelMoro/FE_Personal_Finances/pull/3) | Redesign record and record Drawer. Fix other bugs

## v0.1.1 (2024-03-06)
Release Changes
- Skip tests to update them using redux. This is to be able to deploy in beta.

### Pull Requests
[#1](https://github.com/RafaelMoro/FE_Personal_Finances/pull/2) | Skip tests.

## v0.1.0 (2023-12-20)
Release Changes
- Change of react state management from jotai to redux.
- Refactoring code

## Past versions
- Use of jotai atoms
- Use of async await without fetching libraries
- Have a non standard theme
- Having various changes on design