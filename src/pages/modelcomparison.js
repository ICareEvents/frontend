import React from 'react';

export default function ModelComparison({ analysis }) {
  if (!analysis) return null;

  const {
    topics,
    entities,
    sentiments,
    themes,
    directions,
    outlook,
    summary,
    generated_code,
    raw_response
  } = analysis;

  return (
    <div>
      {!raw_response && (
        <table style={{ borderCollapse: 'collapse', color: 'white', marginBottom: 20 }}>
          <tbody>
            {topics && (
              <tr>
                <td style={{ border: '1px solid #777', padding: 5 }}><strong>Topics</strong></td>
                <td style={{ border: '1px solid #777', padding: 5 }}>
                  {Array.isArray(topics) ? topics.join(', ') : JSON.stringify(topics)}
                </td>
              </tr>
            )}
            {entities && (
              <tr>
                <td style={{ border: '1px solid #777', padding: 5 }}><strong>Entities</strong></td>
                <td style={{ border: '1px solid #777', padding: 5 }}>
                  {Array.isArray(entities) ? entities.join(', ') : JSON.stringify(entities)}
                </td>
              </tr>
            )}
            {sentiments && (
              <tr>
                <td style={{ border: '1px solid #777', padding: 5 }}><strong>Sentiments</strong></td>
                <td style={{ border: '1px solid #777', padding: 5 }}>
                  {JSON.stringify(sentiments)}
                </td>
              </tr>
            )}
            {themes && (
              <tr>
                <td style={{ border: '1px solid #777', padding: 5 }}><strong>Themes</strong></td>
                <td style={{ border: '1px solid #777', padding: 5 }}>
                  {Array.isArray(themes) ? themes.join(', ') : JSON.stringify(themes)}
                </td>
              </tr>
            )}
            {directions && (
              <tr>
                <td style={{ border: '1px solid #777', padding: 5 }}><strong>Directions</strong></td>
                <td style={{ border: '1px solid #777', padding: 5 }}>
                  {JSON.stringify(directions)}
                </td>
              </tr>
            )}
            {outlook && (
              <tr>
                <td style={{ border: '1px solid #777', padding: 5 }}><strong>Outlook</strong></td>
                <td style={{ border: '1px solid #777', padding: 5 }}>
                  {JSON.stringify(outlook)}
                </td>
              </tr>
            )}
            {summary && (
              <tr>
                <td style={{ border: '1px solid #777', padding: 5 }}><strong>Summary</strong></td>
                <td style={{ border: '1px solid #777', padding: 5 }}>
                  {summary}
                </td>
              </tr>
            )}
            {generated_code && (
              <tr>
                <td style={{ border: '1px solid #777', padding: 5 }}><strong>Generated Code</strong></td>
                <td style={{ border: '1px solid #777', padding: 5 }}>
                  <pre style={{ background: '#333', padding: 10, whiteSpace: 'pre-wrap' }}>
                    {generated_code}
                  </pre>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {raw_response && (
        <div>
          <h4>Raw LLM Response</h4>
          <pre style={{ backgroundColor: '#333', padding: 10, color: '#fff', whiteSpace: 'pre-wrap' }}>
            {raw_response}
          </pre>
        </div>
      )}
    </div>
  );
}
