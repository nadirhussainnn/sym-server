import express from "express";
import User from "../models/user.js";

//controller to get User
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const $match = {
      _id: id,
    };
    const data = await User.findOne($match);
    if (data)
      return res
        .status(200)
        .send({ message: "Get user data Successfully", status: true, data });
    return res
      .status(404)
      .send({ message: "User Not Found", status: false, data: [] });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const $match = {
      _id: id,
    };
    const data = await User.findOne($match).select({
      friends: 1,
    });
    console.log("data ", data);
    const friends = await Promise.all(
      data?.friends?.map(
        async (id) =>
          await User.findOne({ _id: id }).select({
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            occupation: 1,
            location: 1,
            picturePath: 1,
          })
      )
    );

    console.log("friends ", friends);
    if (friends)
      return res.status(200).send({
        message: "got user friends Successfully",
        status: true,
        friends,
      });
    return res
      .status(404)
      .send({ message: "User Friends Not Found", status: false, data: [] });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const addRemoveFrinds = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findOne({ _id: id }).lean();
    const friend = await User.findOne({ _id: friendId }).lean();

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((fid) => fid !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    const hey1 = await User.updateOne({ _id: user._id }, user);
    const hey2 = await User.updateOne({ _id: friend._id }, friend);

    if (friend)
      return res.status(200).send({
        friends: friend,
        message: "added friend successfully!!",
        status: true,
      });
    return res
      .status(404)
      .send({ message: "User Friends Not Found", status: false, data: [] });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
