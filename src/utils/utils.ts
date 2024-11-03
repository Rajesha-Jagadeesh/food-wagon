
export const emailRegEx = new RegExp('^[^@]+@[^@]+\.[^@]+$');
export const protectedRoutes = ["/dashboard", "/orders"];
export const customerProtectedRoutes = ["/dashboard"];
export const restaurantProtectedRoutes = ["/shop", "/basket"]
export const authRoutes = ["/login", "/register", "/forgot-password"]