import { Fragment } from 'react';

export default function withLines(text: string) {
  const lines = text.split(/\n/);

  if (lines.length === 1) {
    return text;
  }

  return (
    <Fragment>
      {lines.map((l, i) => (
        <Fragment key={l}>
          {l}

          {i + 1 !== lines.length && <br />}
        </Fragment>
      ))}
    </Fragment>
  );
}
