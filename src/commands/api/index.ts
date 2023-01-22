import config from '~/config.json';

export const getReadme = async () => {
  const res = await fetch(config.readmeUrl);

  return res.text();
};

export const getProjects = async () => {
  const res = await fetch(
    `https://api.github.com/users/${config.social.github}/repos`,
  );

  return res.json();
};
