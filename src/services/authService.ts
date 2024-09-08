
export interface User {
  userId: string;
  username: string;
  email: string;
}

export const fetchUserInfo = async (token: string): Promise<User | undefined> => {

  if(!token) {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/userinfo', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data: User = await response.json();
      return data;
    }
    throw new Error('Failed to fetch user info');
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await fetch('http://localhost:3000/auth/logout');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
