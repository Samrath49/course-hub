import { createSlice } from '@reduxjs/toolkit';

const loadLikesFromLocalStorage = () => {
  const likesData = localStorage.getItem('likes');
  return likesData ? JSON.parse(likesData) : {};
};

const saveLikesToLocalStorage = (likes) => {
  localStorage.setItem('likes', JSON.stringify(likes));
};

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    data: loadLikesFromLocalStorage(),
  },
  reducers: {
    updateLikes: (state, action) => {
      const { courseId, likes } = action.payload;
      state.data[courseId] = likes;
      saveLikesToLocalStorage(state.data);
    },
    removeLikes: (state, action) => {
      const courseId = action.payload;
      if (state.data[courseId]) {
        delete state.data[courseId];
        saveLikesToLocalStorage(state.data);
      }
    },
  },
});

export const { updateLikes, removeLikes } = likesSlice.actions;
export default likesSlice.reducer;
