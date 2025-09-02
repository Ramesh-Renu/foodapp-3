// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   userId: localStorage.getItem('userId') || null,
//   userData: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUserId: (state, action) => {
//       state.userId = action.payload;
//       localStorage.setItem('userId', action.payload);
//     },
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//       state.isAuthenticated = true;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     clearUser: (state) => {
//       state.userId = null;
//       state.userData = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('userId');
//     }
//   }
// });

// export const { setUserId, setUserData, setLoading, setError, clearUser } = userSlice.actions;
// export default userSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   userId: localStorage.getItem('userId') || null,
//   userData: null,
//   loading: false,
//   error: null,
//   isAuthenticated: !!localStorage.getItem('userId')
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUserId: (state, action) => {
//       state.userId = action.payload;
//       state.isAuthenticated = !!action.payload;
//       if (action.payload) {
//         localStorage.setItem('userId', action.payload);
//       } else {
//         localStorage.removeItem('userId');
//       }
//     },
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//       state.isAuthenticated = true;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     clearUser: (state) => {
//       state.userId = null;
//       state.userData = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('userId');
//     }
//   }
// });

// export const { setUserId, setUserData, setLoading, setError, clearUser } = userSlice.actions;
// export default userSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: localStorage.getItem('userId') || null,
  userData: JSON.parse(localStorage.getItem('userData')) || null, // Add this line
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('userId')
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('userId', action.payload);
      } else {
        localStorage.removeItem('userId');
      }
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      // Store userData in localStorage
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.userId = null;
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userId');
      localStorage.removeItem('userData'); // Add this line
    }
  }
});

export const { setUserId, setUserData, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;