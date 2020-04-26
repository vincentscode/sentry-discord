const fetch = require('node-fetch');

const COLORS = {
  debug: parseInt('fbe14f', 16),
  info: parseInt('2788ce', 16),
  warning: parseInt('f18500', 16),
  error: parseInt('e03e2f', 16),
  fatal: parseInt('d20f2a', 16),
};

module.exports = async (request, response) => {
  try {
    const { body } = request;

    const payload = {
      // username: 'Sentry',
      // avatar_url: `https://raw.githubusercontent.com/IanMitchell/sentry-discord/master/sentry-icon.png`,
      embeds: [
        {
          title: "AINotes",
          type: 'rich',
          description: body.data.issue.title,
          url: "https://sentry.io/organizations/vincent-schmandt/issues/" + body.data.issue.id + "/?project=1477776",
          color: COLORS[body.data.issue.level] || COLORS.error,
          fields: [],
        },
      ],
    };

    payload.embeds[0].fields.push({
      name: '**User**',
      value: body.data.installation.uuid,
    });

    fetch(process.env.WEBHOOK, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
  }
};
