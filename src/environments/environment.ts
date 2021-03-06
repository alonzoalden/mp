// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  imageURL: 'https://s3-us-west-2.amazonaws.com/img.staging.toolots.com/catalog/product',
  refurbishURL: 'https://s3-us-west-2.amazonaws.com/img.staging.toolots.com',
  bolURL: 'https://s3-us-west-2.amazonaws.com/img.staging.toolots.com/bol',
  fileURL: 'https://s3-us-west-2.amazonaws.com/img.staging.toolots.com/attachment/file',
  invoiceURL: 'https://s3-us-west-2.amazonaws.com/img.staging.toolots.com/merchantinvoice',
  //imageURL: 'https://staging.toolots.com/media/catalog/product',
  //fileURL: 'https://staging.toolots.com/media/attachment/file',
  linkURL: 'https://staging.toolots.com',
  previewURL: 'https://staging.toolots.com/index.php/catalog/product/view/id/',

  //siteURL: 'https://staging-merchantportal.toolots.com',
  siteURL: 'https://localhost:4200',

  //webapiURL: 'https://webapi.toolots.com/merchantportal',
  webapiURL: 'https://staging-webapi.toolots.com.cn/merchantportal',
  //webapiURL: 'https://localhost:44360',

  // authIssuer: 'https://login.toolots.com/identity',
  authIssuer: 'https://staging-login.toolots.com.cn/identity',
  // authIssuer: 'https://localhost:44388/identity',

  // authclientId: 'angular'
  // authclientId: 'stagingangular'
  authclientId: 'localangular'
};
