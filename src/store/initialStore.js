// /**
//  * @file initialState.js
//  * @description This file defines the initial state of the application store in a Flux architecture.
//  * The initial state is an object that holds the default values for the application's state.
//  * It is used by the store to initialize its state and can be referenced throughout the application
//  * to reset or compare the current state.
//  *
//  * The initial state object for the Redux store.
//  *
//  * This object defines the default state of the application before any actions are dispatched.
//  *
//  * Usage:
//  * - Import this initialState object into your store configuration.
//  * - Use it to set up the default state for your reducers.
//  *
//  * What is a slice:
//  * - A slice is a portion of the initial state that is managed by a specific reducer.
//  * - Each slice typically corresponds to a specific feature or domain in your application.
//  *
//  * How to adjust for your needs:
//  * - Add properties to this object to define the initial state for different slices of your application.
//  * - Ensure that each property corresponds to a slice managed by a reducer.
//  *
//  * @example:
//  * const initialState = {
//  *   user: {
//  *     isAuthenticated: false,
//  *     details: null,
//  *   },
//  *   posts: {
//  *     list: []
//  *   },
//  * };
//  *
//  * @author dmytro-ch21
//  */
// export const initialState = () => ({
//   todos: [],
//   user: {
//     isAuthenticated: false,
//     user_id: null,
//   },
//   contacts: [
//     {
//       base64_image: "src/assets/images/example-image.png",
//       city: "Anytown",
//       country: "USA",
//       email: "john.doe@example.com",
//       full_name: "John Doe",
//       id: 10,
//       is_favorite: true,
//       phone_number: "123-456-7890"
//     },
//     {
//       base64_image: "",
//       city: "Anytown",
//       country: "USA",
//       email: "john.doe@example.com",
//       full_name: "John Doe",
//       id: 11,
//       is_favorite: false,
//       phone_number: "123-456-7890"
//     },
//     {
//       base64_image: "broken",
//       city: "Anytown",
//       country: "USA",
//       email: "john.doe@example.com",
//       full_name: "John Doe",
//       id: 12,
//       is_favorite: false,
//       phone_number: "123-456-7890"
//     }
//   ]
// });

export const initialState = () => ({
  // demo for todos - replace with your needed state
  todos: [],
  user: {
    isAuthenticated: true,
    user_id: null,
  },
  contacts: [],
});