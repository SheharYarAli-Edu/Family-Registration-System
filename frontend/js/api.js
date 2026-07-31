// API Service - Vercel Compatible
const API_URL = window.location.hostname.includes('vercel.app')
  ? window.location.origin + '/api'   // Production (Vercel)
  : 'http://localhost:5000/api';      // Local development

class ApiService {
    static async request(endpoint, method = 'GET', data = null, auth = false) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (auth) {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${endpoint}`, config);
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || 'API request failed');
        }

        return json;
    }

    static async login(email, password) {
        return this.request('/auth/login', 'POST', { email, password });
    }

    static async register(name, email, password, role = 'family_head') {
        return this.request('/auth/register', 'POST', { name, email, password, role });
    }

    static async getMe() {
        return this.request('/auth/me', 'GET', null, true);
    }

    static async getFamilies() {
        return this.request('/families', 'GET', null, true);
    }

    static async getFamily(id) {
        return this.request(`/families/${id}`, 'GET', null, true);
    }

    static async createFamily(data) {
        return this.request('/families', 'POST', data, true);
    }

    static async updateFamily(id, data) {
        return this.request(`/families/${id}`, 'PUT', data, true);
    }

    static async addSubFamily(familyId, data) {
        return this.request(`/families/${familyId}/subfamilies`, 'POST', data, true);
    }
}