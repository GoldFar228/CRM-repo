export default (initialState: {role: string}) => {
  //app.ts -> access.ts -> useAccess(в компонентах)
  return {
    isUser: initialState.role == "User"
  };
};
