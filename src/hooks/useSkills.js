import { useState } from "react";
import {
  getSkillsByUserIdApi,
  getSkillsNameListByUserIdApi,
  getUserSkillByIdApi,
  postSkillApi,
} from "../api/skills";

const useSkills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getSkillsByUserId = async (idUser, callback) => {
    try {
      setLoading(true);
      const res = await getSkillsByUserIdApi(idUser, callback);
      setSkills(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getSkillsNameListByUserId = async (idUser, callback) => {
    try {
      setLoading(true);
      const res = await getSkillsNameListByUserIdApi(idUser, callback);
      setSkills(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getUserSkillById = async (idUser, idSkill, callback) => {
    try {
      setLoading(true);
      const res = await getUserSkillByIdApi(idUser, idSkill, callback);
      setSkills(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const postSkill = async (idUser, idMov, data, callback) => {
    try {
      setLoading(true);
      const res = await postSkillApi(idUser, idMov, data, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = {
    getSkillsByUserId,
    getSkillsNameListByUserId,
    getUserSkillById,
    postSkill,
  };

  return { skills, loading, error, actions };
};

export { useSkills };
