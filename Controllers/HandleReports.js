import { reports } from "../Models/report_submissions.model.js";
export const saveProgramReport = async (req, res) => {
  try {
    const {
      name,
      email,
      title,
      severity,
      type,
      detail,
      steps,
      impact,
      affected_system,
      file,
    } = req.body;
    const new_report = new reports({
      name,
      email,
      title,
      severity,
      type,
      detail,
      steps,
      impact,
      affected_system,
      poc:file,
    });
    await new_report.save();
    res.status(201).json({
      message: "Reports Data saved to DB",
      new_report,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
