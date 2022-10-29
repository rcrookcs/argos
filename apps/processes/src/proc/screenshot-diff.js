import { createJobWorker } from "@argos-ci/job-core";
import { job as screenshotDiffJob } from "@argos-ci/screenshot-diff";

import "../setup";

createJobWorker(screenshotDiffJob);
