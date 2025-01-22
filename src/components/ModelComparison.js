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
    raw_response
  } = analysis;
  
  return (
    <div style={{ marginTop: 20 }}>
      <h2>LLM Analysis</h2>
      {!raw_response && (
        <div style={{ marginBottom: 20 }}>
          <h3>Extracted Information</h3>
          <table style={{ borderCollapse: 'collapse', color: 'white' }}>
            <tbody>
              {topics && (
                <tr>
                  <td style={{ border: '1px solid #777', padding: 5, verticalAlign: 'top' }}>
                    <strong>Topics</strong>
                  </td>
                  <td style={{ border: '1px solid #777', padding: 5 }}>
                    {Array.isArray(topics)
                      ? topics.join(', ')
                      : JSON.stringify(topics)}
                  </td>
                </tr>
              )}
              {entities && (
                <tr>
                  <td style={{ border: '1px solid #777', padding: 5, verticalAlign: 'top' }}>
                    <strong>Entities</strong>
                  </td>
                  <td style={{ border: '1px solid #777', padding: 5 }}>
                    {Array.isArray(entities)
                      ? entities.join(', ')
                      : JSON.stringify(entities)}
                  </td>
                </tr>
              )}
              {sentiments && (
                <tr>
                  <td style={{ border: '1px solid #777', padding: 5, verticalAlign: 'top' }}>
                    <strong>Sentiments</strong>
                  </td>
                  <td style={{ border: '1px solid #777', padding: 5 }}>
                    {JSON.stringify(sentiments)}
                  </td>
                </tr>
              )}
              {themes && (
                <tr>
                  <td style={{ border: '1px solid #777', padding: 5, verticalAlign: 'top' }}>
                    <strong>Themes</strong>
                  </td>
                  <td style={{ border: '1px solid #777', padding: 5 }}>
                    {Array.isArray(themes)
                      ? themes.join(', ')
                      : JSON.stringify(themes)}
                  </td>
                </tr>
              )}
              {directions && (
                <tr>
                  <td style={{ border: '1px solid #777', padding: 5, verticalAlign: 'top' }}>
                    <strong>Directions</strong>
                  </td>
                  <td style={{ border: '1px solid #777', padding: 5 }}>
                    {JSON.stringify(directions)}
                  </td>
                </tr>
              )}
              {outlook && (
                <tr>
                  <td style={{ border: '1px solid #777', padding: 5, verticalAlign: 'top' }}>
                    <strong>Outlook</strong>
                  </td>
                  <td style={{ border: '1px solid #777', padding: 5 }}>
                    {JSON.stringify(outlook)}
                  </td>
                </tr>
              )}
              {summary && (
                <tr>
                  <td style={{ border: '1px solid #777', padding: 5, verticalAlign: 'top' }}>
                    <strong>Summary</strong>
                  </td>
                  <td style={{ border: '1px solid #777', padding: 5 }}>
                    {summary}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {raw_response && (
        <div style={{ marginTop: 20 }}>
          <h3>Raw LLM Response</h3>
          <pre style={{ backgroundColor: '#333', padding: 10, whiteSpace: 'pre-wrap', color: '#fff' }}>
            {raw_response}
          </pre>
        </div>
      )}
    </div>
  );
}
