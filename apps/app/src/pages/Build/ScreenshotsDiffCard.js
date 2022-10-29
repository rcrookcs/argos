import { x } from "@xstyled/styled-components";
import { gql } from "graphql-tag";

import {
  BaseLink,
  Card,
  CardHeader,
  CardTitle,
  CollapseCard,
  CollapseCardBody,
  CollapseCardHeader,
  CollapseCardTitle,
  Icon,
  useDisclosureState,
} from "@argos-ci/app/src/components";

import {
  getDiffStatusColor,
  getDiffStatusIcon,
} from "../../containers/ScreenshotDiffStatus";

export const ScreenshotsDiffCardFragment = gql`
  fragment ScreenshotsDiffCardFragment on ScreenshotDiff {
    url
    status
    compareScreenshot {
      id
      name
      url
    }
    baseScreenshot {
      id
      name
      url
    }
  }
`;

export function EmptyScreenshotCard() {
  return (
    <Card>
      <CardHeader border={0}>
        <CardTitle>No screenshot found</CardTitle>
      </CardHeader>
    </Card>
  );
}

export function ScreenshotsDiffCard({
  screenshotDiff,
  opened = true,
  showChanges = true,
  ...props
}) {
  const disclosure = useDisclosureState({ defaultOpen: opened });
  const { compareScreenshot, baseScreenshot, url } = screenshotDiff;

  return (
    <CollapseCard {...props}>
      <CollapseCardHeader
        state={disclosure}
        position="sticky"
        top={42}
        alignSelf="flex-start"
      >
        <CollapseCardTitle state={disclosure}>
          <Icon
            as={getDiffStatusIcon(screenshotDiff.status)}
            color={getDiffStatusColor(screenshotDiff.status)}
          />
          {compareScreenshot?.name || baseScreenshot.name}
        </CollapseCardTitle>
      </CollapseCardHeader>

      <CollapseCardBody state={disclosure} display="flex" gap={1} p={1}>
        <x.div flex={1 / 2}>
          {baseScreenshot?.url ? (
            <BaseLink
              href={baseScreenshot.url}
              target="_blank"
              title="Base screenshot"
            >
              <img
                alt={baseScreenshot.name}
                src={disclosure.open ? baseScreenshot.url : ""}
              />
            </BaseLink>
          ) : null}
        </x.div>

        <x.div flex={1 / 2}>
          {compareScreenshot?.url && screenshotDiff.status !== "stable" ? (
            <BaseLink
              href={compareScreenshot.url}
              target="_blank"
              title="Current screenshot"
              position="relative"
              display="inline-block" // fix Firefox bug on "position: relative"
            >
              {showChanges && url ? (
                <x.img
                  src={url}
                  position="absolute"
                  backgroundColor="rgba(255, 255, 255, 0.8)"
                />
              ) : null}

              <img
                alt={compareScreenshot.name}
                src={disclosure.open ? compareScreenshot.url : ""}
              />
            </BaseLink>
          ) : null}
        </x.div>
      </CollapseCardBody>
    </CollapseCard>
  );
}
