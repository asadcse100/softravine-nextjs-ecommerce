interface SendSms {
    send(to: string, from: string, text: string, template_id: string): Promise<any>;
  }
  
  class Zender implements SendSms {
    async send(to: string, from: string, text: string, template_id: string): Promise<any> {
      let params: any;
      let apiurl: string | undefined;
  
      if (!process.env.ZENDER_SERVICE || parseInt(process.env.ZENDER_SERVICE) < 2) {
        let mode: string | undefined;
  
        if (process.env.ZENDER_DEVICE) {
          mode = "devices";
        } else {
          mode = "credits";
        }
  
        if (mode === "devices") {
          params = {
            secret: process.env.ZENDER_APIKEY!,
            mode: "devices",
            device: process.env.ZENDER_DEVICE!,
            phone: to,
            message: text,
            sim: parseInt(process.env.ZENDER_SIM!) < 2 ? 1 : 2
          };
        } else {
          params = {
            secret: process.env.ZENDER_APIKEY!,
            mode: "credits",
            gateway: process.env.ZENDER_GATEWAY!,
            phone: to,
            message: text
          };
        }
  
        apiurl = process.env.ZENDER_SITEURL ? `${process.env.ZENDER_SITEURL}/api/send/sms` : undefined;
      } else {
        params = {
          secret: process.env.ZENDER_APIKEY!,
          account: process.env.ZENDER_WHATSAPP!,
          type: "text",
          recipient: to,
          message: text
        };
  
        apiurl = process.env.ZENDER_SITEURL ? `${process.env.ZENDER_SITEURL}/api/send/whatsapp` : undefined;
      }
  
      if (!apiurl) {
        throw new Error("API URL is not defined");
      }
  
      const args = new URLSearchParams(params).toString();
  
      const response = await fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: args
      });
  
      return response.json(); // assuming the response is JSON
    }
  }
  