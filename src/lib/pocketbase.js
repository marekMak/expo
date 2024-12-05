import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

async function registerUser(email, password) {
  try {
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
    });

    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const authData = await pb
      .collection('users')
      .authWithPassword(email, password);
    return authData;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

function logout() {
  pb.authStore.clear();
}

export { loginUser, registerUser, logout, pb };
