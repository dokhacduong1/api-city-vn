"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWards = exports.getDistrict = exports.getCity = exports.index = void 0;
const cityProvider = require("../../../data/tinh_tp.json");
const district = require("../../../data/quan_huyen.json");
const wards = require("../../../data/xa_phuong.json");
const index = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dataArrayCityProvider = Object.keys(cityProvider).map((key) => cityProvider[key]);
            const dataArrayDistrict = Object.keys(district).map((key) => district[key]);
            const dataArrayWard = Object.keys(wards).map((key) => wards[key]);
            dataArrayCityProvider.sort((a, b) => parseInt(a.code) - parseInt(b.code));
            const wardByDistrict = dataArrayWard.reduce((acc, ward) => {
                const { parentCode } = ward;
                if (!acc[parentCode]) {
                    acc[parentCode] = [];
                }
                acc[parentCode].push(ward);
                return acc;
            }, {});
            const districtByCity = dataArrayDistrict.reduce((acc, district) => {
                const { code } = district;
                if (!acc[district.parentCode]) {
                    acc[district.parentCode] = [];
                }
                acc[district.parentCode].push(Object.assign(Object.assign({}, district), { ward: wardByDistrict[code] || [] }));
                return acc;
            }, {});
            const convertDataCity = dataArrayCityProvider.map((item) => {
                return Object.assign(Object.assign({}, item), { district: districtByCity[item.code] || [] });
            });
            res.status(200).json({
                data: convertDataCity,
                code: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                code: 500,
                message: "Something went wrong",
            });
        }
    });
};
exports.index = index;
const getCity = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dataArrayCityProvider = Object.keys(cityProvider).map((key) => cityProvider[key]);
            dataArrayCityProvider.sort((a, b) => parseInt(a.code) - parseInt(b.code));
            res.status(200).json({
                data: dataArrayCityProvider,
                code: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                code: 500,
                message: "Something went wrong",
            });
        }
    });
};
exports.getCity = getCity;
const getDistrict = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const code = req.params.code;
            let dataArrayDistrict = Object.keys(district)
                .reduce((acc, key) => {
                if (district[key].parentCode === code) {
                    acc.push(district[key]);
                }
                return acc;
            }, [])
                .sort((a, b) => parseInt(a.code) - parseInt(b.code));
            res.status(200).json({
                data: dataArrayDistrict,
                code: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                code: 500,
                message: "Something went wrong",
            });
        }
    });
};
exports.getDistrict = getDistrict;
const getWards = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const code = req.params.code;
            const dataArrayWards = Object.keys(wards)
                .reduce((acc, key) => {
                if (wards[key].parentCode === code) {
                    acc.push(wards[key]);
                }
                return acc;
            }, [])
                .sort((a, b) => parseInt(a.code) - parseInt(b.code));
            res.status(200).json({
                data: dataArrayWards,
                code: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                code: 500,
                message: "Something went wrong",
            });
        }
    });
};
exports.getWards = getWards;
