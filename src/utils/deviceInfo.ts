// Utility functions for collecting device and browser information

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  screenResolution: string;
  timezone: string;
  cookieEnabled: boolean;
  doNotTrack: string | null;
  referrer: string;
  timestamp: Date;
}

export interface IPInfo {
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

/**
 * Collects comprehensive device and browser information
 */
export const collectDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return {
      userAgent: 'Server-side',
      platform: 'Unknown',
      language: 'en',
      screenResolution: 'Unknown',
      timezone: 'UTC',
      cookieEnabled: false,
      doNotTrack: null,
      referrer: '',
      timestamp: new Date(),
    };
  }

  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    referrer: document.referrer,
    timestamp: new Date(),
  };
};

/**
 * Attempts to get user's IP address using a public service
 * Note: This is a client-side approach and may not always work due to CORS
 */
export const getIPAddress = async (): Promise<string> => {
  try {
    // Try multiple IP services as fallbacks
    const ipServices = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://ipinfo.io/json',
    ];

    for (const service of ipServices) {
      try {
        const response = await fetch(service, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          return data.ip || data.query || 'Unknown';
        }
      } catch (error) {
        // Try next service
        continue;
      }
    }

    return 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
};

/**
 * Gets basic IP information including location data
 * Returns minimal info if API fails - never throws
 */
export const getIPInfo = async (): Promise<IPInfo> => {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    try {
      const response = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return {
          ip: data.ip || 'Unknown',
          country: data.country_name,
          region: data.region,
          city: data.city,
          timezone: data.timezone,
        };
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      // Fall through to fallback
    }

    // Fallback to basic IP with timeout
    try {
      const ipController = new AbortController();
      const ipTimeoutId = setTimeout(() => ipController.abort(), 2000);
      
      const ipServices = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
      ];

      for (const service of ipServices) {
        try {
          const response = await fetch(service, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: ipController.signal,
          });

          if (response.ok) {
            const data = await response.json();
            clearTimeout(ipTimeoutId);
            return { ip: data.ip || data.query || 'Unknown' };
          }
        } catch {
          continue;
        }
      }
      
      clearTimeout(ipTimeoutId);
    } catch {
      // Ignore fallback errors
    }

    // Return minimal info if all fails
    return { ip: 'Unknown' };
  } catch (error) {
    // Never throw - always return something
    return { ip: 'Unknown' };
  }
};
