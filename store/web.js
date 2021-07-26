export default {
	state() {
		return {
			active_index: 1,
			select_icon: 0,
			lang_type: uni.db.get('lang_type') || 'en',
			auth: []
		}
	},
	mutations: {
		set_alert(state, obj) {
			state.alert = Object.assign(state.alert, obj);
		},
		set_auth(state, auth) {
			state.auth = auth
		},
		set_lang(state, lang) {
			state.lang_type = lang;
			uni.db.set('lang_type', lang);
		}
	}
}
