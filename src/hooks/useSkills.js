import { useState } from "react";
import { getSkillsApi, getSingleSkillApi, postSkillApi } from "../api/skills";

const useSkills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getSkills = async (idUser, callback) => {
    try {
      setLoading(true);
      const res = await getSkillsApi(idUser, callback);
      setSkills(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getSingleSkill = async (idUser, idSkill, callback) => {
    try {
      setLoading(true);
      const res = await getSingleSkillApi(idUser, idSkill, callback);
      setSkills(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const postSkill = async (idUser, data, callback) => {
    try {
      setLoading(true);
      const res = await postSkillApi(idUser, data, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getSkills, getSingleSkill, postSkill };

  return { skills, loading, error, actions };
};

export { useSkills };
