export const login = (req, res) => {
  const { email } = req.body;
  if (!email.endsWith("@example.com")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ token: "dummy-auth-token" });
};
