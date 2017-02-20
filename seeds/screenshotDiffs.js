exports.seed = (knex, Promise) => {
  return knex('screenshot_diffs').delete()
    .then(() => {
      return Promise.all([
        knex('screenshot_diffs').insert({
          buildId: 1,
          baseScreenshotId: 1,
          compareScreenshotId: 1,
          score: 0,
          jobStatus: 'complete',
          validationStatus: 'unknown',
          s3Id: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
        knex('screenshot_diffs').insert({
          buildId: 2,
          baseScreenshotId: 1,
          compareScreenshotId: 2,
          score: 0,
          jobStatus: 'complete',
          validationStatus: 'unknown',
          s3Id: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
        knex('screenshot_diffs').insert({
          buildId: 3,
          baseScreenshotId: 2,
          compareScreenshotId: 3,
          score: 0,
          jobStatus: 'complete',
          validationStatus: 'unknown',
          s3Id: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
        knex('screenshot_diffs').insert({
          buildId: 4,
          baseScreenshotId: 3,
          compareScreenshotId: 4,
          score: 0,
          jobStatus: 'complete',
          validationStatus: 'unknown',
          s3Id: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
        knex('screenshot_diffs').insert({
          buildId: 5,
          baseScreenshotId: 4,
          compareScreenshotId: 5,
          score: 0,
          jobStatus: 'complete',
          validationStatus: 'unknown',
          s3Id: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
        knex('screenshot_diffs').insert({
          buildId: 6,
          baseScreenshotId: 5,
          compareScreenshotId: 6,
          score: 0,
          jobStatus: 'complete',
          validationStatus: 'unknown',
          s3Id: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
        knex('screenshot_diffs').insert({
          buildId: 6,
          baseScreenshotId: 7,
          compareScreenshotId: 8,
          score: 0.3,
          jobStatus: 'complete',
          validationStatus: 'unknown',
          s3Id: 'diff6.png',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      ])
    })
}
