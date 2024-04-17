const settings = {
    'clientId': process.env.AZURE_AD_CLIENT_ID,
    'tenantId': process.env.AZURE_AD_TENANT_ID,
    'graphUserScopes': [
      'user.read',
      'mail.read',
      'mail.send',
      'sites.fullControl.all'
    ]
  };
  
  module.exports = settings;