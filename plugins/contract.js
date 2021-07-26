import Vue from 'vue'
import Mm_contract from './mm_contract.js';
import token from './abi/token.json';
import pool from './abi/pool.json';

/**
 * 合约组件
 */
var Contract = {
  /**
   * 安装
   * @param {Object} Vue vue类
   * @param {Object} optons 配置参数
   */
  install(Vue, optons) {
    var ct = new Mm_contract({
      chainId: 56,
      chain: "bsc",
      gas: 0,
      gas_add: 100000,
      precision: Math.pow(10, 18),
      token_abi: token.abi,
      pool_abi: pool.abi
    });
    ct.token = {
      "lip": {
        address: "0x6C720e8BAcAE21d6aF5630bC404C90d8832d644a"
      },
      "usdt": {
        address: "0x55d398326f99059fF775485246999027B3197955"
      },
      "btc": {
        address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
      },
      "eth": {
        address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
      },
      "ada": {
        address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47"
      },
      "fil": {
        address: "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153"
      },
      "dot": {
        address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402"
      },
      "ltc": {
        address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94"
      },
      "doge": {
        address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43"
      },
      "cake": {
        address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
      },
      "bch": {
        address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf"
      },
      "eos": {
        address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6"
      },
      "link": {
        address: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd"
      },
      "xrp": {
        address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE"
      },
      "uni": {
        address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1"
      }
    };

    ct.pool = {
      "mint": {
        address: "0x24aA7e36F1C614D4201614829B6fA591c5316a6c"
      }
    };

    Vue.prototype.$ct = ct;
  }
}

Vue.use(Contract, {});

export default Contract;
