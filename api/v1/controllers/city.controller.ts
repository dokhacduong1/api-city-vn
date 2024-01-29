import { Request, Response } from "express";
const cityProvider = require("../../../data/tinh_tp.json");
const district = require("../../../data/quan_huyen.json");
const wards = require("../../../data/xa_phuong.json");
// [GET] /api/v1/duongits
export const index = async function (
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Chuyển đổi đối tượng thành mảng
    const dataArrayCityProvider = Object.keys(cityProvider).map(
      (key) => cityProvider[key]
    );
    const dataArrayDistrict = Object.keys(district).map((key) => district[key]);
    const dataArrayWard = Object.keys(wards).map((key) => wards[key]);
    // Sắp xếp mảng theo thuộc tính 'code'
    dataArrayCityProvider.sort((a, b) => parseInt(a.code) - parseInt(b.code));

    // Tạo một đối tượng để lưu trữ các phường/xã theo parentCode
    const wardByDistrict = dataArrayWard.reduce((acc, ward) => {
      const { parentCode } = ward;
      if (!acc[parentCode]) {
        acc[parentCode] = [];
      }
      acc[parentCode].push(ward);
      return acc;
    }, {});

    // Tạo một đối tượng để lưu trữ các quận/huyện theo parentCode, kèm theo các phường/xã tương ứng
    const districtByCity = dataArrayDistrict.reduce((acc, district) => {
      const { code } = district;
      if (!acc[district.parentCode]) {
        acc[district.parentCode] = [];
      }
      acc[district.parentCode].push({
        ...district,
        ward: wardByDistrict[code] || [],
      });
      return acc;
    }, {});

    // Bây giờ, ánh xạ qua dataArrayCityProvider sẽ nhanh hơn
    const convertDataCity = dataArrayCityProvider.map((item) => {
      return {
        ...item,
        district: districtByCity[item.code] || [],
      };
    });
    res.status(200).json({
      data: convertDataCity,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong",
    });
  }
};

// [GET] /api/v1/duongits/city
export const getCity = async function (
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Chuyển đổi đối tượng thành mảng
    const dataArrayCityProvider = Object.keys(cityProvider).map(
      (key) => cityProvider[key]
    );

    // Sắp xếp mảng theo thuộc tính 'code'
    dataArrayCityProvider.sort((a, b) => parseInt(a.code) - parseInt(b.code));

    res.status(200).json({
      data: dataArrayCityProvider,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong",
    });
  }
};

// [GET] /api/v1/duongits/district/{code}
export const getDistrict = async function (
  req: Request,
  res: Response
): Promise<void> {
  try {
    const code = req.params.code;
    // Chuyển đổi đối tượng thành mảng
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
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong",
    });
  }
};

// [GET] /api/v1/duongits/wards/{code}
export const getWards = async function (
  req: Request,
  res: Response
): Promise<void> {
  try {
    const code = req.params.code;
    // Chuyển đổi đối tượng thành mảng
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
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong",
    });
  }
};
