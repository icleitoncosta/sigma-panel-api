import process from 'process';
import { chromium } from "playwright-extra";
import { BrowserContext, Page } from "playwright";

export interface LoginResult {
    id: string,
    parent_user_id: string,
    created_at: string,
    updated_at: string,
    last_login_at: string,
    username: string,
    note: string,
    status: 'ACTIVE',
    credits: number,
    locale: 'pt',
    parent: null,
    permissions: string[],
    role: 'master-reseller',
    message: string,
    last_recharge_at: string,
    unread_messages_count: number | null,
    disable_after_days_without_recharge: number | null,
    reseller_renew_template: string | null,
    customer_renew_template: string | null,
    customer_renew_confirmation_template: string | null,
    customer_expiry_test_template: string | null,
    customer_expiry_test_template_after: string | null,
    reseller_membership_renew_template_variable_amount_3_days: string | null,
    reseller_membership_renew_template_variable_amount_expiry_day: string | null,
    reseller_membership_renew_template_fixed_amount_3_days: string | null,
    reseller_membership_renew_template_fixed_amount_expiry_day: string | null,
    reseller_membership_renew_confirmation: string | null,
    reseller_membership_renew_confirmation_manual: string | null,
    payment_gateways: [],
    servers: string[],
    server_list_count: [],
    need_reset_password: 'NO',
    botbot: null,
    customer_subscribe_url: string,
    reseller_subscribe_url: string,
    membership_active: 'NO',
    membership_type: 'PER_ACTIVE_CUSTOMER',
    membership_plan_type: 'PER_ACTIVE_CUSTOMER',
    membership_cost: null,
    membership_cost_extra: null,
    membership_credits_to_recharge: null,
    membership_days_recurrency: null,
    membership_min_customers_to_charge: null,
    membership_max_number_of_customers: null,
    membership_expiry_date: null,
    membership_reset_credits_on_expiry_date: null,
    membership_total: null,
    notifications: [],
    subpanels: [],
    twofactor: { app: boolean, email: boolean, telegram: boolean, whatsapp: boolean },
    referral_link_welcome_message_template: null,
    is_master: false,
    panel_url: string,
    allow_reseller_to_renew_subresellers: 'NO',
    allow_parent_to_view_personal_data: 'NO',
    show_earnings_dashboard: 'YES',
    remember_page_filters: 'NO',
    parent_can_edit_personal_data: 'NO' | 'YES',
    servers_dns: { BV4D3rLaqZ: '' },
    token: string
  };
export async function loginAndGenerateData(username: string, password: string): Promise<{
    page: Page,
    browser: BrowserContext,
    loginResult: LoginResult,
}> {
    try {
        if(!username || !password)
            throw new Error("Invalid username or password");

        const browser = await chromium.launchPersistentContext('../data',{
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--start-maximized',
                '--disable-dev-shm-usage',
                '--disable-dev-shm-usage',
                '--lang=pt-BR,pt',
            ],
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
            isMobile: false,
            devtools: true,
            permissions: ["geolocation"],
            locale: 'pt-BR',
            timezoneId: 'America/Sao_Paulo', 
            geolocation: { latitude: -23.55052, longitude: -46.633308 },
            extraHTTPHeaders: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
                'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8', 
              },
        });
        const page = await browser.pages()[0];
        
        const responsePromise = page.waitForResponse(response => 
            response.url().includes('api/auth/login') && response.request().method() === 'POST'
        );

        await page.goto(`${process.env.BASE_URL}/#/sign-in`);
        // Simulações para parecer um usuário real
        await page.waitForTimeout(1000 + Math.random() * 2000); 
        await page.locator('input[name="username"]').pressSequentially(username, { delay: 300 });
        await page.keyboard.press('Tab');
        await page.locator('input[name="password"]').pressSequentially(password, { delay: 315 });
        await page.mouse.move(100, 100);
        await page.mouse.move(400, 400, { steps: 50 });
        await page.hover('button#kt_sign_in_submit');
        page.keyboard.press('Enter');
        
        const result = await responsePromise;
        const resultData = await result.json(); 
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'load' }),
        ]);

        // Aqui verifica se há aquele banner de noticias do sigma, e pressiona o botão ok para fecha-lo
        await page.waitForTimeout(1000 + Math.random() * 2000); 
        const banner = page.locator('#noticeModal');
        if (await banner.isVisible()) {
            await page.locator('#noticeModal .modal-footer button').click();
        }
        return {
            page,
            browser,
            loginResult: resultData,
        };
    } catch (error) {
        throw error;
    }
}