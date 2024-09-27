import axios from 'axios';

const BASE_URL = 'http://localhost/Registrationphp/manage.php';

export const fetchUsers = () => {
  return axios.get(`${BASE_URL}?action=fetch_users`);
};

export const createUser = (user) => {
  return axios.post(BASE_URL, { action: 'create_user', ...user });
};

export const deleteUser = (user_id) => {
  return axios.post(BASE_URL, { action: 'delete_user', user_id });
};

export const fetchGuides = () => {
  return axios.get(`${BASE_URL}?action=fetch_guides`);
};

export const createGuide = (guide) => {
  return axios.post(BASE_URL, { action: 'create_guide', ...guide });
};

export const deleteGuide = (guide_id) => {
  return axios.post(BASE_URL, { action: 'delete_guide', guide_id });
};

export const fetchAdmins = () => {
  return axios.get(`${BASE_URL}?action=fetch_admins`);
};

export const createAdmin = (admin) => {
  return axios.post(BASE_URL, { action: 'create_admin', ...admin });
};

export const deleteAdmin = (user_id) => {
  return axios.post(BASE_URL, { action: 'delete_admin', user_id });
};

export const fetchCategories = () => {
  return axios.get(`${BASE_URL}?action=fetch_categories`);
};

export const addLookup = (lookup) => {
  return axios.post(BASE_URL, { action: 'add_lookup', ...lookup });
};

export const deleteLookup = (lookup_id) => {
  return axios.post(BASE_URL, { action: 'delete_lookup', lookup_id });
};


export const fetchEvents = () => {
  return axios.get(`${BASE_URL}?action=fetch_events`);
};

export const createEvent = (event) => {
  return axios.post(BASE_URL, { action: 'create_event', ...event });
};

export const deleteEvent = (event_id) => {
  return axios.post(BASE_URL, { action: 'delete_event', event_id });
};

export const fetchMembers = () => {
  return axios.get(`${BASE_URL}?action=fetch_members`);
};

export const createMember = (member) => {
  return axios.post(BASE_URL, { action: 'create_member', ...member });
};

export const deleteMember = (member_id) => {
  return axios.post(BASE_URL, { action: 'delete_member', member_id });
};

// New function to update event guide
export const updateEventGuide = (event_id, guide_id) => {
  return axios.post(BASE_URL, { action: 'update_event_guide', event_id, guide_id });
};
