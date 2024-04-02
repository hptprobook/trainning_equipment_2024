import { GET_DB } from '~/config/mongodb';
import moment from 'moment-timezone';
import { ObjectId } from 'mongodb';
const addUserFromGit = async (dataUser) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const result = await collection.insertOne(dataUser);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const updateToken = async (idGit, token) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const result = await collection.updateOne(
      { idGit: idGit },
      {
        $set: {
          curentToken: token,
        },
      }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const onceIdGit = async (idGit) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({
      idGit: idGit,
    });
    return existingUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (idGit) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const dataUser = await collection.findOne({ idGit: idGit });
    return dataUser;
  } catch (error) {
    throw new Error(error);
  }
};
const getUserById = async (id) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const objectId = new ObjectId(id);
    const dataUser = await collection.findOne({ _id: objectId });
    return dataUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByIdCheckSecureHash = async (id, secureHash) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const objectId = new ObjectId(id);
    const dataUser = await collection.findOne({
      _id: objectId,
      secureHash: secureHash,
    });
    if (dataUser) {
      return 99;
    } else {
      await collection.updateOne(
        { _id: objectId }, // Điều kiện tìm kiếm
        { $set: { secureHash: secureHash } } // Giá trị cập nhật
      );
      return '00';
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserPro = async (id, day) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const objectId = new ObjectId(id);
    const currentTimeVietnam = moment().tz('Asia/Ho_Chi_Minh');

    const dayAdd = currentTimeVietnam
      .clone()
      .startOf('day')
      .add(day, 'days')
      .valueOf();
    const dataUser = await collection.findOne({
      _id: objectId,
    });
    if (dataUser?.timePro) {
      const startTimePro = moment(dataUser.timePro)
        .tz('Asia/Ho_Chi_Minh')
        .startOf('day');
      const dayDiff = startTimePro.diff(currentTimeVietnam, 'days');
      const newday = day + dayDiff;
      const dayAddNew = currentTimeVietnam
        .clone()
        .startOf('day')
        .add(newday, 'days')
        .valueOf();
      const updatePro = await collection.updateOne(
        { _id: objectId },
        { $set: { isPro: true, timePro: dayAddNew } }
      );
      return updatePro.modifiedCount;
    } else {
      const updatePro = await collection.updateOne(
        { _id: objectId },
        { $set: { isPro: true, timePro: dayAdd } }
      );
      return updatePro.modifiedCount;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserUnPro = async (idGit) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const currentTimeVietnam = moment().tz('Asia/Ho_Chi_Minh');
    const dataUser = await collection.findOne({ idGit: idGit });
    // console.log(dataUser);
    if (dataUser?.timePro) {
      const startTimePro = moment(dataUser.timePro)
        .tz('Asia/Ho_Chi_Minh')
        .startOf('day');
      const dayDiff = startTimePro.diff(currentTimeVietnam, 'days');
      if (dayDiff == 0) {
        const updateUnPro = await collection.updateOne(
          { _id: dataUser._id },
          { $set: { isPro: false, timePro: null } }
        );
        return updateUnPro;
      } else {
        return 'Người dùng còn vip';
      }
    } else {
      return 'Người dùng không phải là vip';
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const userModal = {
  addUserFromGit,
  onceIdGit,
  updateToken,
  getUser,
  getUserById,
  getUserByIdCheckSecureHash,
  updateUserPro,
  updateUserUnPro,
};
