export default {
	state: {
		// 合约地址
		address: "",
		// 是否已链接
		is_connected: false,
		// 是否已授权
		is_approved: false,
		// 等级
		lv: 0,
		// 余额
		balance: 0,
		// 价格
		lip_price: 0,
		// 邀请人
		inviter: "",
		//我的算力
		power: 0,
		// 算力
		team_power: 0,
		// 分红
		earn: 0,
		// 团队
		team: [
			// {
			//   address: "",
			//   power: 0,
			//   team_power: 0
			// }
		],
		// 已销毁LIP数量
		destroy: 0,
		// 总算力
		total_power: 0,
		// 年化收益率
		apr: 0,
		// 池子
		pool: [
			// {
			//   pledge_coin_1: "lip",
			//   pledge_coin_2: "",
			//   multiplying: "2X",
			//   pledge: "LIP",
			//   earn: "LIP",
			//   token_address: "0xe3c389EC19637Cf60FfC70AD3c55707F88D59381",
			//   token_balance: 0,
			//   apr: 0,
			//   is_approved: false,
			//   precision: 10 ** 8
			// },
			{
				pledge_coin_1: "bnb",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "BNB-LIP",
				earn: "LIP",
				token_address: "0x0000000000000000000000000000000000000002",
				token_balance: 0,
				apr: 0,
				is_approved: true,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "usdt",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "USDT-LIP",
				earn: "LIP",
				token_address: "0x55d398326f99059fF775485246999027B3197955",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "btc",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "BTC-LIP",
				earn: "LIP",
				token_address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "eth",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "ETH-LIP",
				earn: "LIP",
				token_address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "ada",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "ADA-LIP",
				earn: "LIP",
				token_address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			}, {
				pledge_coin_1: "fil",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "FIL-LIP",
				earn: "LIP",
				token_address: "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "dot",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "DOT-LIP",
				earn: "LIP",
				token_address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "ltc",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "LTC-LIP",
				earn: "LIP",
				token_address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "doge",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "DOGE-LIP",
				earn: "LIP",
				token_address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 8
			},
			{
				pledge_coin_1: "cake",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "CAKE-LIP",
				earn: "LIP",
				token_address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "bch",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "BCH-LIP",
				earn: "LIP",
				token_address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "eos",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "EOS-LIP",
				earn: "LIP",
				token_address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "link",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "LINK-LIP",
				earn: "LIP",
				token_address: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "xrp",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "XRP-LIP",
				earn: "LIP",
				token_address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			},
			{
				pledge_coin_1: "uni",
				pledge_coin_2: "lip",
				multiplying: "1X",
				pledge: "UNI-LIP",
				earn: "LIP",
				token_address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
				token_balance: 0,
				apr: 0,
				is_approved: false,
				precision: 10 ** 18
			}
		]
	},
	mutations: {
		/**
		 * 设置
		 * @param {Object} state 缓存态
		 * @param {Object} kv 键值对
		 */
		set(state, kv) {
			uni.push(state, kv);
		},
		/**
		 * 设置池子
		 * @param {Object} state 缓存态
		 * @param {Object} obj 池子对象
		 */
		set_pool(state, obj) {
			var list = state.pool;
			for (var i = 0; i < list.length; i++) {
				var o = list[i];
				if (o.pledge === obj.pledge) {
					Object.assign(o, obj);
					break;
				}
			}
		},
		/**
		 * 设置团队成员
		 * @param {Object} state 缓存态
		 * @param {Object} obj 成员对象
		 */
		set_team(state, obj) {
			var list = state.pool;
			for (var i = 0; i < list.length; i++) {
				var o = list[i];
				if (o.address === obj.address) {
					Object.assign(o, obj);
					break;
				}
			}
		}
	}
}
