import { CensusDashboardPage } from './app.po';

describe('census-dashboard App', () => {
  let page: CensusDashboardPage;

  beforeEach(() => {
    page = new CensusDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
