let items = {
  state: {
    items: [
      { label: '学生', value: 'student' },
      { label: '教师', value: 'teacher' },
      { label: '访客', value: 'otherguy' },
    ],
  },
  getters: {
    getAllItems(state) {
      return state.items;
    },
  },
};
export default items;
