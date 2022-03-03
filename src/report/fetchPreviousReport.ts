import { getOctokit } from '@actions/github';

import { getReportTag } from '../constants/getReportTag';
import { Options } from '../typings/Options';

export async function fetchPreviousReport(
    octokit: ReturnType<typeof getOctokit>,
    repo: { owner: string; repo: string },
    pr: { number: number },
    options: Options
) {
    const commentList = await octokit.paginate(
        'GET /repos/:owner/:repo/issues/:issue_number/comments',
        {
            ...repo,
            issue_number: pr.number,
        }
    );

    console.log('commentList ===> ', JSON.stringify(commentList));

    console.log('========================================================');

    const previousReport = commentList.find((comment) =>
        (comment as { body: string }).body.startsWith(getReportTag(options))
    );

    console.log('previousReport ===> ', JSON.stringify(previousReport));

    return !previousReport ? null : previousReport;
}
