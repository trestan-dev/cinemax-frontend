import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, Image, ActivityIndicator } from 'react-native';
import Peer from 'peerjs';
import { Dimensions } from 'react-native';
import Markdown from 'react-native-markdown-display';

const handleSmartLink = () => {
  // Replace this with your actual Direct Link from Adsterra
  const smartLinkUrl = "https://www.effectivegatecpm.com/ba4n4bn1u?key=c4d46c1a4f74e3aea4ebb8725567fe32";
  
  // Open the ad in a new tab so they don't leave your movie site
  if (typeof window !== 'undefined') {
    window.open(smartLinkUrl, '_blank');
  }
};

const AdsterraBanner = () => {
  const adRef = useRef<View>(null);

  useEffect(() => {
    // 1. Safety Check: Ensure we are on Web and the Ref is attached
    if (typeof document !== 'undefined' && adRef.current) {
      const container = adRef.current as any;

      // 2. Clear previous content to avoid duplicate script crashes
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      try {
        // 3. Create the Configuration Script
        const config = document.createElement('script');
        config.type = 'text/javascript';
        // IMPORTANT: Replace 'YOUR_KEY' with your actual numerical key from Adsterra
        config.innerHTML = `
          atOptions = {
            'key' : 'YOUR_KEY',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        `;

        // 4. Create the Invocation Script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//www.highperformancedformats.com/YOUR_KEY/invoke.js`;
        
        // 5. Append both scripts
        container.appendChild(config);
        container.appendChild(script);
      } catch (e) {
        console.error("Adsterra Injection Error:", e);
      }
    }
  }, []);

  // 6. Give the View a background color during testing so you can see it's there
  return (
    <View 
      ref={adRef} 
      style={{ 
        width: 320, 
        height: 50, 
        backgroundColor: '#151f2e', // Match your theme
        alignSelf: 'center' 
      }} 
    />
  );
};

// App.tsx
//export const API_URL = "https://cinemax-watch.com";
// Change this at the top of App.tsx
//const TUNNEL_DOMAIN = "10.37.218.231"; // Replace with your actual tunnel link
const BACKEND_URL = `https://cinemax-backend-1pwt.onrender.com`;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CURRENT_YEAR = new Date().getFullYear();
const MAX_TMDB_PAGES = 167;
// ── MULTI-SERVER SYSTEM ─────────────────────────────────────────────────────
const SERVERS = [
  {
    name: "VidSrc CC",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const base = `https://vidsrc.cc/v2/embed/${type === 'tv' ? 'tv' : 'movie'}/${id}`;
      const params = ['autoPlay=1'];
      if (startAt > 3) params.push(`startAt=${Math.floor(startAt)}`);
      return `${base}?${params.join('&')}`;
    }
  },
  {
    name: "VidLink",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://vidlink.pro/${t}/${id}?autoplay=true&primaryColor=4f8ef7`;
    }
  },
  {
    name: "2Embed",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://www.2embed.stream/embed/${t}/${id}`;
    }
  },
  {
    name: "SuperEmbed",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      if (type === 'tv') return `https://multiembed.mov/?video_id=${id}&tmdb=1`;
      return `https://multiembed.mov/?video_id=${id}&tmdb=1`;
    }
  },
  {
    name: "Embed.su",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://embed.su/embed/${t}/${id}`;
    }
  },
  {
    name: "VidSrc ME",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://vidsrc.me/embed/${t}?tmdb=${id}`;
    }
  },
  {
    name: "VidSrc ICU",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://vidsrc.icu/embed/${t}/${id}`;
    }
  },
  {
    name: "VidSrc IN",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://vidsrc.in/embed/${t}?tmdb=${id}`;
    }
  },
  {
    name: "VidSrc XYZ",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://vidsrc.xyz/embed/${t}?tmdb=${id}`;
    }
  },
  {
    name: "VidSrc NET",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://vidsrc.net/embed/${t}?tmdb=${id}`;
    }
  },
  {
    name: "NontonGo",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://www.NontonGo.net/embed/${t}/${id}`;
    }
  },
  {
    name: "GoDrive",
    needsImdb: true,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      if (!imdbId) return '';
      return `https://godriveplayer.com/player.php?imdb=${imdbId}`;
    }
  },
  {
    name: "AutoEmbed",
    needsImdb: false,
    getUrl: (type: string, id: any, startAt: number = 0, imdbId?: string) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://autoembed.co/embed/${t}/${id}`;
    }
  },
];

const SERVER_URL = (type: string, id: any, startAtSeconds: number = 0, serverIndex: number = 0, imdbId?: string) => {
  const idx = Math.min(serverIndex, SERVERS.length - 1);
  return SERVERS[idx].getUrl(type, id, startAtSeconds, imdbId);
};

const GENRES = [
  { id: null, name: "All" }, { id: 16, name: "Animation" }, { id: 28, name: "Action" }, 
  { id: 35, name: "Comedy" }, { id: 27, name: "Horror" }, { id: 10749, name: "Romance" }, { id: 878, name: "Sci-Fi" },
  { id: 18, name: "Drama" }, { id: 10751, name: "Family" }, { id: 14, name: "Fantasy" }, { id: 9648, name: "Mystery" },
  { id: 53, name: "Thriller" }, { id: 12, name: "Adventure" }, { id: 10765, name: "Sci-Fi & Fantasy" }, { id: 10759, name: "Action & Adventure" }
];

const COUNTRIES = [
  { code: "", name: "All" }, { code: "JP", name: "Japan" }, { code: "PH", name: "Philippines" }, 
  { code: "KR", name: "Korea" }, { code: "US", name: "USA" }
];

const MONTHS = [
  { val: "01", name: "Jan" }, { val: "02", name: "Feb" }, { val: "03", name: "Mar" },
  { val: "04", name: "Apr" }, { val: "05", name: "May" }, { val: "06", name: "Jun" },
  { val: "07", name: "Jul" }, { val: "08", name: "Aug" }, { val: "09", name: "Sep" },
  { val: "10", name: "Oct" }, { val: "11", name: "Nov" }, { val: "12", name: "Dec" }
];

export default function App() {
  document.title = "CinemaX";
  const { width, height } = useWindowDimensions();
  const fmtChatTime = () => { const n = new Date(); return n.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) + " · " + n.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); };
  const fmtHMS = (totalSeconds: number) => {
    const s = Math.floor(totalSeconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  };
  const sliderRef = useRef(null);
  const scrollViewRef = useRef(null);
  
  const [selectedServer, setSelectedServer] = useState(0);
  const [imdbId, setImdbId] = useState<string | null>(null);
  const [imdbLoading, setImdbLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [genreSearch, setGenreSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Persistent States
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'Home');
  const [groupPage, setGroupPage] = useState(parseInt(localStorage.getItem('groupPage')) || 1);
  const [selectedMovie, setSelectedMovie] = useState(JSON.parse(localStorage.getItem('selectedMovie')) || null);
  const [loadVideo, setLoadVideo] = useState(localStorage.getItem('loadVideo') === 'true');

  const [totalPages, setTotalPages] = useState(MAX_TMDB_PAGES);
  const [pageInput, setPageInput] = useState(groupPage.toString());
  const [selectedGenre, setSelectedGenre] = useState<number|null>(
    localStorage.getItem('filter_genre') ? parseInt(localStorage.getItem('filter_genre')!) : null
  );
  const [selectedCountry, setSelectedCountry] = useState(localStorage.getItem('filter_country') || "");
  const [showFilters, setShowFilters] = useState(false);
  const [yearFrom, setYearFrom] = useState(localStorage.getItem('filter_yearFrom') || "1990");
  const [yearTo, setYearTo] = useState(localStorage.getItem('filter_yearTo') || CURRENT_YEAR.toString());
  const [monthFrom, setMonthFrom] = useState(localStorage.getItem('filter_monthFrom') || "01");
  const [monthTo, setMonthTo] = useState(localStorage.getItem('filter_monthTo') || "12");
  const [copied, setCopied] = useState(false);

  // ── NEW FEATURES ─────────────────────────────────────
  const [comingSoon, setComingSoon] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [categoryRows, setCategoryRows] = useState<{title: string, icon?: string, iconColor?: string, genre: number|null, type: string, items: any[]}[]>([]);
  const [rowsLoading, setRowsLoading] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [homeSubTab, setHomeSubTab] = useState<'browse'|'coming'|'hot'>('browse');

  // Persist filter state
  useEffect(() => { 
    if (selectedGenre !== null) localStorage.setItem('filter_genre', String(selectedGenre));
    else localStorage.removeItem('filter_genre');
  }, [selectedGenre]);
  useEffect(() => { localStorage.setItem('filter_country', selectedCountry); }, [selectedCountry]);
  useEffect(() => { localStorage.setItem('filter_yearFrom', yearFrom); }, [yearFrom]);
  useEffect(() => { localStorage.setItem('filter_yearTo', yearTo); }, [yearTo]);
  useEffect(() => { localStorage.setItem('filter_monthFrom', monthFrom); }, [monthFrom]);
  useEffect(() => { localStorage.setItem('filter_monthTo', monthTo); }, [monthTo]);

  // Watch Together UI States — full page, persisted across refresh
  const [watchTogetherVisible, setWatchTogetherVisible] = useState(
    localStorage.getItem('wt_page_open') === 'true'
  );
  const [peerConnected, setPeerConnected] = useState(false);
  const [hostMode, setHostMode] = useState(
    localStorage.getItem('wt_host_mode') === 'true'
  );
  const [wtStatus, setWtStatus] = useState('');
  const [wtVideoMinimized, setWtVideoMinimized] = useState(
    localStorage.getItem('wt_video_minimized') === 'true'
  );
  const [wtMovie, setWtMovie] = useState<any>(
    JSON.parse(localStorage.getItem('wt_movie') || 'null')
  );
  const [wtVideoLoaded, setWtVideoLoaded] = useState(
    localStorage.getItem('wt_video_loaded') === 'true'
  );
  const [wtShowMoviePicker, setWtShowMoviePicker] = useState(false);
  const [wtPickerSearch, setWtPickerSearch] = useState('');
  const [wtPickerMovies, setWtPickerMovies] = useState<any[]>([]);
  const [wtPickerLoading, setWtPickerLoading] = useState(false);
  const [wtPickerGenre, setWtPickerGenre] = useState<number|null>(null);
  const [wtPickerType, setWtPickerType] = useState<'movie'|'tv'>('movie');
  const [wtPickerPage, setWtPickerPage] = useState(1);
  const [wtPickerHasMore, setWtPickerHasMore] = useState(true);

  const fetchWtPickerMovies = async (reset = false) => {
    setWtPickerLoading(true);
    const page = reset ? 1 : wtPickerPage;
    try {
      let url = '';
      if (wtPickerSearch.trim().length > 2) {
        url = `${BACKEND_URL}/api/movies/search?type=${wtPickerType}&query=${encodeURIComponent(wtPickerSearch)}&page=${page}`;
      } else {
        url = `${BACKEND_URL}/api/movies/discover?type=${wtPickerType}&page=${page}`;
        if (wtPickerGenre) url += `&with_genres=${wtPickerGenre}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.results) {
        const formatted = data.results.map(m => ({
          id: m.id.toString(), title: m.title || m.name,
          poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
          banner: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : null,
          tmdbId: m.id, type: wtPickerType, rating: m.vote_average,
          releaseDate: m.release_date || m.first_air_date || 'Unknown',
          synopsis: m.overview || 'No description available.', genreIds: m.genre_ids
        }));
        setWtPickerMovies(prev => reset ? formatted : [...prev, ...formatted]);
        setWtPickerHasMore(data.results.length === 20);
        if (!reset) setWtPickerPage(p => p + 1);
        else setWtPickerPage(2);
      }
    } catch(e) { console.error(e); }
    finally { setWtPickerLoading(false); }
  };

  useEffect(() => {
    if (wtShowMoviePicker) { setWtPickerPage(1); fetchWtPickerMovies(true); }
  }, [wtShowMoviePicker, wtPickerSearch, wtPickerGenre, wtPickerType]);

  // ── REAL VIDEO TIME FROM vidsrc.cc postMessage ────────────────────────────
  // vidsrc.cc fires 'time' events infrequently (every few seconds).
  // We extrapolate: store the last reported time + the wall-clock moment it arrived,
  // then compute currentTime = lastReportedTime + (Date.now() - lastReportedAt) / 1000
  // This gives smooth, accurate time between events.
  const lastReportedTimeRef = useRef<number>(0);    // last currentTime from vidsrc
  const lastReportedAtRef = useRef<number>(0);       // Date.now() when we got it
  const isPlayingRef = useRef<boolean>(false);        // track play/pause state
  const connRef = useRef<any>(null);                  // always-fresh conn ref
  const hostModeRef = useRef<boolean>(false);         // always-fresh hostMode ref
  const peerConnectedRef = useRef<any>(false);

  // Keep refs in sync with state
  useEffect(() => { connRef.current = conn; }, [conn]);
  useEffect(() => { hostModeRef.current = hostMode; }, [hostMode]);
  useEffect(() => { peerConnectedRef.current = peerConnected; }, [peerConnected]);

  const hostRealCurrentTimeRef = useRef<number>(0);
  const [hostDisplayTime, setHostDisplayTime] = useState<number>(0);

  // Extrapolate current time from last known position + elapsed wall-clock
  const getExtrapolatedTime = () => {
    if (!lastReportedAtRef.current) return lastReportedTimeRef.current;
    if (!isPlayingRef.current) return lastReportedTimeRef.current;
    const wallElapsed = (Date.now() - lastReportedAtRef.current) / 1000;
    return lastReportedTimeRef.current + wallElapsed;
  };

  // Continuously push extrapolated time to guest every 1 second
  const liveTimeIntervalRef = useRef<any>(null);

  const startLiveTimePush = () => {
    clearInterval(liveTimeIntervalRef.current);
    liveTimeIntervalRef.current = setInterval(() => {
      if (!hostModeRef.current || !peerConnectedRef.current) return;
      const c = connRef.current;
      if (!c || !c.open) return;
      const t = getExtrapolatedTime();
      if (t > 0) {
        // Always keep ref fresh — wtHostSeekSync reads this directly
        hostRealCurrentTimeRef.current = t;
        setHostDisplayTime(Math.floor(t));
        c.send({ type: 'REAL_TIME_UPDATE', currentTime: t });
      }
    }, 1000);
  };

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const msg = e.data;
      if (!msg || typeof msg !== 'object') return;

      let evtType: string | undefined;
      let currentTime: number | undefined;

      if (msg.type === 'PLAYER_EVENT' && msg.data) {
        evtType = msg.data.event;
        currentTime = msg.data.currentTime;
      } else if (msg.event && typeof msg.currentTime === 'number') {
        evtType = msg.event;
        currentTime = msg.currentTime;
      } else {
        return;
      }

      if (typeof currentTime !== 'number' || isNaN(currentTime) || currentTime < 0) return;

      // Always update refs immediately — no React state delay
      lastReportedTimeRef.current = currentTime;
      lastReportedAtRef.current = Date.now();
      hostRealCurrentTimeRef.current = currentTime;
      // Update display state (only for UI)
      setHostDisplayTime(Math.floor(currentTime));

      if (evtType === 'play' || evtType === 'playing' || evtType === 'timeupdate' || evtType === 'time') {
        if (!isPlayingRef.current) {
          isPlayingRef.current = true;
        }
        // Start/keep the live push interval running
        if (!liveTimeIntervalRef.current) {
          startLiveTimePush();
        }
      }
      if (evtType === 'pause') {
        isPlayingRef.current = false;
        const c = connRef.current;
        if (c && c.open) {
          c.send({ type: 'HOST_SEEKED', currentTime });
        }
      }
      if (evtType === 'seeked' || evtType === 'seeking') {
        const c = connRef.current;
        if (c && c.open) {
          c.send({ type: 'HOST_SEEKED', currentTime });
        }
      }
    };

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      clearInterval(liveTimeIntervalRef.current);
    };
  }, []); // empty deps — all state accessed via refs
  // We track the host's playback using a virtual "startTimestamp":
  // startTimestamp = the Unix ms at which the movie would have started at 00:00
  // So elapsed = (Date.now() - startTimestamp) / 1000
  //
  // CRITICAL: This is wall-clock elapsed, NOT accounting for ads/buffering on host.
  // Host can manually correct this via "Sync Now" with a custom time input.
  //
  // AUTO-SYNC: heartbeat NEVER reloads the iframe. It only updates the ref so
  // that when the guest manually syncs, they get an accurate position.
  // ─────────────────────────────────────────────────────────────────────────

  const [wtPlayStartTime, setWtPlayStartTime] = useState<number|null>(null);
  const [wtIframeKey, setWtIframeKey] = useState(0);
  // The offset (seconds) that was used when the guest's iframe was last loaded
  const [wtLoadedOffset, setWtLoadedOffset] = useState(0);
  // Live ref for host's startTimestamp — always fresh, not stale state
  const hostStartTsRef = useRef<number | null>(null);
  const guestStartTsRef = useRef<number | null>(null);
  // For the host "Sync Now" manual time input
  const [wtSyncMinutes, setWtSyncMinutes] = useState('');
  const [wtSyncSeconds, setWtSyncSeconds] = useState('');
  const [wtShowSyncInput, setWtShowSyncInput] = useState(false);
  // Live drift display for guest (updated every second, NO iframe reload)
  const [wtDriftSeconds, setWtDriftSeconds] = useState<number | null>(null);
  const driftTimerRef = useRef<any>(null);
  const heartbeatRef = useRef<any>(null);
  const autoSyncRef = useRef<any>(null);

  // Update drift display every second without reloading iframe
  const startDriftTracker = (startTs: number, loadedOffsetSec: number) => {
    clearInterval(driftTimerRef.current);
    driftTimerRef.current = setInterval(() => {
      const hostElapsed = (Date.now() - startTs) / 1000;
      // We don't know guest's actual position either (cross-origin iframe)
      // Best estimate: guest is at (hostElapsed - loadedOffsetSec) relative drift
      // Actually: guest started at loadedOffsetSec, has been playing since load
      // We show host's current position so guest knows where host is
      setWtDriftSeconds(hostElapsed);
    }, 1000);
  };
  const [chatMode, setChatMode] = useState<'hidden'|'fab'|'open'>(
    (localStorage.getItem('chat_mode') as any) || 'hidden'
  );
  const [chatVisible, setChatVisible] = useState(false); // kept for compat
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fabHideTimer = useRef<any>(null);

  // After chat closes, show fab for 3s then auto-hide to peek
  const closeChatToFab = () => {
    setChatMode('fab');
    localStorage.setItem('chat_mode', 'fab');
    clearTimeout(fabHideTimer.current);
    fabHideTimer.current = setTimeout(() => {
      setChatMode('hidden');
      localStorage.setItem('chat_mode', 'hidden');
    }, 3000);
  };

  const openChat = () => {
    clearTimeout(fabHideTimer.current);
    setChatMode('open');
    localStorage.setItem('chat_mode', 'open');
  };

  const handleFabClick = () => {
    if (chatMode === 'hidden') {
      // peek → show full fab
      setChatMode('fab');
      localStorage.setItem('chat_mode', 'fab');
      clearTimeout(fabHideTimer.current);
      fabHideTimer.current = setTimeout(() => {
        if (chatMode !== 'open') {
          setChatMode('hidden');
          localStorage.setItem('chat_mode', 'hidden');
        }
      }, 3000);
    } else if (chatMode === 'fab') {
      // full fab → open chat
      clearTimeout(fabHideTimer.current);
      openChat();
    }
  };

  // WT Picture-in-Picture: video stays playing when user goes back to main menu
  const [wtPip, setWtPip] = useState(
    localStorage.getItem('wt_pip') === 'true'
  );
  useEffect(() => { localStorage.setItem('wt_pip', wtPip.toString()); }, [wtPip]);
  
  const [messages, setMessages] = useState(() => {
  const saved = localStorage.getItem('cinemax_chat_history');
  
  // Kunin ang kasalukuyang oras para sa initial message
  const initialTime = fmtChatTime();
  
  // I-parse ang saved history kung mayroon, kung wala ay gamitin ang default na may timestamp
  return saved ? JSON.parse(saved) : [{ 
    role: 'assistant', 
    content: "Hi! I’m CinemaX AI. Looking for a specific vibe or movie recommendation?",
    timestamp: initialTime // Dito ise-save ang permanenteng oras
  }];
});

  useEffect(() => {
    localStorage.setItem('cinemax_chat_history', JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    localStorage.removeItem('cinemax_chat_history');
    const resetTime = fmtChatTime();
    
    setMessages([{ 
        role: 'assistant', 
        content: "Hi! I’m CinemaX AI. Looking for a specific vibe or movie recommendation?",
        timestamp: resetTime // Bagong oras pagkatapos i-clear
    }]);
};

  // Sync Persistence to LocalStorage
  useEffect(() => { localStorage.setItem('activeTab', activeTab); }, [activeTab]);
  useEffect(() => { localStorage.setItem('groupPage', groupPage.toString()); }, [groupPage]);
  useEffect(() => { localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie)); }, [selectedMovie]);
  useEffect(() => { localStorage.setItem('loadVideo', loadVideo.toString()); }, [loadVideo]);

  // Watch Together Logic — with full localStorage persistence
  const [peer, setPeer] = useState(null);
  const [conn, setConn] = useState(null);
  const [roomId, setRoomId] = useState(localStorage.getItem('wt_room_id') || "");
  const [joinCode, setJoinCode] = useState(localStorage.getItem('wt_join_code') || "");
  const [wtChatMessages, setWtChatMessages] = useState<any[]>(
    JSON.parse(localStorage.getItem('wt_chat') || '[]')
  );
  const [wtChatInput, setWtChatInput] = useState('');
  const wtChatScrollRef = useRef(null);

  // Persist WT state to localStorage
  useEffect(() => { localStorage.setItem('wt_page_open', watchTogetherVisible.toString()); }, [watchTogetherVisible]);
  useEffect(() => { localStorage.setItem('wt_host_mode', hostMode.toString()); }, [hostMode]);
  useEffect(() => { localStorage.setItem('wt_room_id', roomId); }, [roomId]);
  useEffect(() => { localStorage.setItem('wt_join_code', joinCode); }, [joinCode]);
  useEffect(() => { localStorage.setItem('wt_chat', JSON.stringify(wtChatMessages)); }, [wtChatMessages]);
  useEffect(() => { localStorage.setItem('wt_movie', JSON.stringify(wtMovie)); }, [wtMovie]);
  useEffect(() => { localStorage.setItem('wt_video_loaded', wtVideoLoaded.toString()); }, [wtVideoLoaded]);
  useEffect(() => { localStorage.setItem('wt_video_minimized', wtVideoMinimized.toString()); }, [wtVideoMinimized]);

  // Scroll WT chat to bottom on new message
  useEffect(() => {
    wtChatScrollRef.current?.scrollToEnd({ animated: true });
  }, [wtChatMessages]);

  // Init PeerJS — restore room/connection after refresh
  useEffect(() => {
    const savedRoomId = localStorage.getItem('wt_room_id') || '';
    const savedHostMode = localStorage.getItem('wt_host_mode') === 'true';
    const savedJoinCode = localStorage.getItem('wt_join_code') || '';

    // Use saved peer ID if host so room ID stays the same across refresh
    const peerId = savedHostMode && savedRoomId ? savedRoomId : undefined;

    const newPeer = new Peer(peerId, {
      host: "cinemax-backend-1pwt.onrender.com",
      port: 443,
      path: '/peerjs',
      secure: true
    });

    newPeer.on('open', (id) => {
      console.log('PeerJS connected, ID:', id);
      setPeer(newPeer);
      // If we were the host, restore our room ID
      if (savedHostMode && savedRoomId) {
        setRoomId(id);
        setWtStatus('⏳ Room restored. Waiting for friend to re-join...');
      }
      // If we were a guest, attempt to re-connect
      if (!savedHostMode && savedJoinCode) {
        setTimeout(() => {
          try {
            const c = newPeer.connect(savedJoinCode);
            setConn(c);
            attachConnHandlers(c, false);
          } catch (e) { console.log('Auto-reconnect failed', e); }
        }, 1500);
      }
    });

    newPeer.on('connection', (incomingConn) => {
      setConn(incomingConn);
      setHostMode(true);
      setWtStatus('🟡 Friend joined!');
      attachConnHandlers(incomingConn, true);
    });

    newPeer.on('error', (err) => {
      console.error('PeerJS Error:', err.type, err.message);
      if (err.type === 'unavailable-id') {
        // ID taken (e.g., old session still alive), get a new one
        const fallback = new Peer(undefined, {
          host: "cinemax-backend-1pwt.onrender.com",
          port: 443,
          path: '/peerjs',
          secure: true
        });
        fallback.on('open', (id) => {
          setPeer(fallback);
          if (savedHostMode) { setRoomId(id); }
        });
        fallback.on('connection', (incomingConn) => {
          setConn(incomingConn);
          setHostMode(true);
          attachConnHandlers(incomingConn, true);
        });
      }
    });

    return () => newPeer.destroy();
  }, []);

  const doGuestResync = (startTs: number, silent = false) => {
    const elapsedSeconds = Math.max(0, (Date.now() - startTs) / 1000);
    guestStartTsRef.current = startTs;
    setWtPlayStartTime(startTs);
    setWtLoadedOffset(elapsedSeconds);
    setWtVideoLoaded(false);
    setTimeout(() => {
      setWtVideoLoaded(true);
      setWtIframeKey(k => k + 1);
      startDriftTracker(startTs, elapsedSeconds);
      if (!silent) {
        const m = Math.floor(elapsedSeconds / 60);
        const s = Math.floor(elapsedSeconds % 60);
        setWtStatus(`🔗 Synced! Starting at ${fmtHMS(elapsedSeconds)}`);
      }
    }, 200);
  };

  const attachConnHandlers = (c, isHost: boolean) => {
    c.on('open', () => {
      setPeerConnected(true);
      setWtStatus(isHost ? '🟢 Friend connected!' : '🟢 Connected to host!');
      if (!isHost) {
        const saved = JSON.parse(localStorage.getItem('wt_movie') || 'null');
        if (saved) setWtMovie(saved);
        // If host was already playing, ask for current timestamp
        c.send({ type: 'REQUEST_SYNC' });
      }
    });
    c.on('data', (data: any) => {
      if (data.type === 'SYNC_MOVIE') {
        setWtMovie(data.movie);
        setWtVideoLoaded(false);
        setWtPlayStartTime(null);
        setWtLoadedOffset(0);
        guestStartTsRef.current = null;
        clearInterval(driftTimerRef.current);
        setWtDriftSeconds(null);
        setWtStatus('🎬 Host selected: ' + data.movie.title);

      } else if (data.type === 'SYNC_PLAY') {
        // Host just hit play — iframe not loaded yet on guest, so we load it at current offset
        const startTs: number = data.startTimestamp;
        guestStartTsRef.current = startTs;
        const elapsedSeconds = Math.max(0, (Date.now() - startTs) / 1000);
        setWtPlayStartTime(startTs);
        setWtLoadedOffset(elapsedSeconds);
        setWtVideoLoaded(true);
        setWtIframeKey(k => k + 1);
        startDriftTracker(startTs, elapsedSeconds);
        const m = Math.floor(elapsedSeconds / 60), s = Math.floor(elapsedSeconds % 60);
        setWtStatus(`▶️ Host started — loading at ${fmtHMS(elapsedSeconds)}`);

      } else if (data.type === 'HEARTBEAT') {
        // NEVER reload iframe on heartbeat — just update the ref for manual sync
        if (!isHost && data.startTimestamp) {
          guestStartTsRef.current = data.startTimestamp;
          setWtPlayStartTime(data.startTimestamp);
          startDriftTracker(data.startTimestamp, wtLoadedOffset);
        }
        // If host sends heartbeat and guest isn't playing yet, show the play button
        if (!isHost && data.startTimestamp && !wtVideoLoaded) {
          setWtStatus('▶️ Host is playing — tap Sync & Play to join!');
        }

      } else if (data.type === 'SYNC_SEEK') {
        // Host explicitly pushed a sync — reload guest iframe at new position
        if (!isHost) {
          const startTs: number = data.startTimestamp;
          doGuestResync(startTs, false);
          const m = Math.floor(data.elapsedSeconds / 60), s = Math.floor(data.elapsedSeconds % 60);
          setWtStatus(`⏩ Host synced you to ${fmtHMS(data.elapsedSeconds)}`);
        }

      } else if (data.type === 'REAL_TIME_UPDATE') {
        // Host's actual extrapolated currentTime — update ref for manual sync, update display
        if (!isHost) {
          const ts = Date.now() - (data.currentTime * 1000);
          guestStartTsRef.current = ts;
          setWtDriftSeconds(data.currentTime); // live display, no iframe reload
        }
      } else if (data.type === 'HOST_SEEKED') {
        // Host paused or seeked — auto-reload guest iframe to match
        if (!isHost) {
          const seekTs = Date.now() - (data.currentTime * 1000);
          doGuestResync(seekTs, false);
          const m = Math.floor(data.currentTime / 60), s = Math.floor(data.currentTime % 60);
          setWtStatus(`⏩ Host seeked to ${fmtHMS(data.currentTime)} — resyncing...`);
        }
      } else if (data.type === 'REQUEST_SYNC') {
        // Guest just connected — send them the real current video time
        if (isHost) {
          const realTime = hostRealCurrentTimeRef.current;
          if (realTime > 0) {
            // Send real currentTime so guest can startAt the right position
            c.send({ type: 'HOST_SEEKED', currentTime: realTime });
          } else if (hostStartTsRef.current) {
            c.send({ type: 'SYNC_PLAY', startTimestamp: hostStartTsRef.current });
          }
        }

      } else if (data.type === 'SYNC_PAUSE') {
        if (!isHost) setWtStatus('⏸ Host paused.');

      } else if (data.type === 'CHAT') {
        setWtChatMessages(prev => [...prev, {
          from: 'friend', text: data.text,
          time: fmtChatTime()
        }]);
      }
    });
    c.on('close', () => {
      setPeerConnected(false);
      clearInterval(driftTimerRef.current);
      setWtStatus('🔴 Disconnected. Waiting for reconnect...');
    });
    c.on('error', () => {
      setPeerConnected(false);
      setWtStatus('⚠️ Connection error.');
    });
  };

  const createRoom = () => {
    if (roomId) {
      // Cancel existing room — destroy peer so next create gets a brand-new ID
      if (conn) { conn.close(); setConn(null); }
      if (peer) { peer.destroy(); setPeer(null); }
      setRoomId('');
      setHostMode(false);
      setPeerConnected(false);
      setWtStatus('');
      setWtMovie(null);
      setWtVideoLoaded(false);
      localStorage.removeItem('wt_room_id');
      localStorage.removeItem('wt_host_mode');
      // Spin up a fresh peer so a new random ID is ready for next create
      const freshPeer = new Peer(undefined, {
        host: "cinemax-backend-1pwt.onrender.com",
        port: 443, path: '/peerjs', secure: true
      });
      freshPeer.on('open', (id) => {
        setPeer(freshPeer);
        console.log('Fresh peer ready, ID:', id);
      });
      freshPeer.on('connection', (incomingConn) => {
        setConn(incomingConn);
        setHostMode(true);
        attachConnHandlers(incomingConn, true);
      });
    } else {
      // Use current peer's ID as room ID
      const newRoomId = peer?.id || '';
      setRoomId(newRoomId);
      setHostMode(true);
      localStorage.setItem('wt_room_id', newRoomId);
      localStorage.setItem('wt_host_mode', 'true');
      setWtStatus('⏳ Room created! Share your Room ID with a friend.');
    }
  };

  const joinRoom = () => {
    if (!peer || !joinCode.trim()) return;
    setWtStatus('🔄 Connecting...');
    try {
      const c = peer.connect(joinCode.trim());
      setConn(c);
      setHostMode(false);
      attachConnHandlers(c, false);
    } catch (e) {
      setWtStatus('⚠️ Failed to connect. Check the Room ID.');
    }
  };

  const leaveRoom = () => {
    if (conn) { conn.close(); setConn(null); }
    clearInterval(heartbeatRef.current);
    clearInterval(autoSyncRef.current);
    clearInterval(driftTimerRef.current);
    clearInterval(liveTimeIntervalRef.current);
    clearTimeout(inactivityTimerRef.current);
    hostStartTsRef.current = null;
    guestStartTsRef.current = null;
    setRoomId('');
    setJoinCode('');
    setPeerConnected(false);
    setHostMode(false);
    setWtStatus('');
    setWtChatMessages([]);
    setWtMovie(null);
    setWtVideoLoaded(false);
    setWtPlayStartTime(null);
    setWtLoadedOffset(0);
    setWtDriftSeconds(null);
    setWtShowSyncInput(false);
    ['wt_room_id','wt_join_code','wt_host_mode','wt_movie','wt_video_loaded','wt_chat'].forEach(k => localStorage.removeItem(k));
  };

  const wtPickMovie = (movie) => {
    setWtMovie(movie);
    setWtVideoLoaded(false);
    setWtPlayStartTime(null);
    setWtLoadedOffset(0);
    setWtShowMoviePicker(false);
    clearInterval(heartbeatRef.current);
    clearInterval(driftTimerRef.current);
    clearInterval(liveTimeIntervalRef.current);
    isPlayingRef.current = false;
    lastReportedTimeRef.current = 0;
    lastReportedAtRef.current = 0;
    hostStartTsRef.current = null;
    guestStartTsRef.current = null;
    hostRealCurrentTimeRef.current = 0;
    setHostDisplayTime(0);
    setWtDriftSeconds(null);
    if (conn && conn.open) {
      conn.send({ type: 'SYNC_MOVIE', movie });
      setWtStatus('🎬 Synced new movie to friend: ' + movie.title);
    }
  };

 // const heartbeatRef = useRef<any>(null);
  // We track the "adjusted" start time — if host seeks, we create a new virtual startTimestamp
  //const hostStartTsRef = useRef<number | null>(null);

  // ── AUTO-INACTIVITY: leave room after 5 mins of no user interaction ──────
  const inactivityTimerRef = useRef<any>(null);
  const INACTIVITY_MS = 5 * 60 * 1000; // 5 minutes

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      // Only auto-end if we're in a room
      if (connRef.current || roomId) {
        setWtStatus('⏰ Room ended due to inactivity.');
        leaveRoom();
      }
    }, INACTIVITY_MS);
  };

  // Start timer when connected, reset on any touch/click inside WT
  useEffect(() => {
    if (peerConnected) {
      resetInactivityTimer();
    } else {
      clearTimeout(inactivityTimerRef.current);
    }
    return () => clearTimeout(inactivityTimerRef.current);
  }, [peerConnected]);

  const wtHostPlay = () => {
    const startTimestamp = Date.now();
    hostStartTsRef.current = startTimestamp;
    setWtPlayStartTime(startTimestamp);
    setWtVideoLoaded(true);
    setWtIframeKey(k => k + 1);
    isPlayingRef.current = true;
    resetInactivityTimer(); // activity detected
    if (conn && conn.open) {
      conn.send({ type: 'SYNC_PLAY', startTimestamp });
    }
    // Start live time push — sends extrapolated time every 1s to guest
    startLiveTimePush();
    // Heartbeat every 8s as backup — use connRef so it's always fresh
    clearInterval(heartbeatRef.current);
    heartbeatRef.current = setInterval(() => {
      const c = connRef.current;
      if (c && c.open && hostStartTsRef.current) {
        c.send({ type: 'HEARTBEAT', startTimestamp: hostStartTsRef.current });
      }
    }, 8000);
  };

  // Host pushes sync — uses REAL video currentTime from postMessage if available, else manual input
  const wtHostSeekSync = () => {
    let totalSeconds: number;
    if (wtSyncMinutes || wtSyncSeconds) {
      // Manual override entered by user
      totalSeconds = (parseInt(wtSyncMinutes || '0') * 60) + parseInt(wtSyncSeconds || '0');
    } else {
      // Read DIRECTLY from ref — zero React-state lag
      // getExtrapolatedTime() = lastReportedTime + wall-clock elapsed since last postMessage
      const extrapolated = getExtrapolatedTime();
      if (extrapolated > 0) {
        totalSeconds = extrapolated;
      } else if (hostRealCurrentTimeRef.current > 0) {
        totalSeconds = hostRealCurrentTimeRef.current;
      } else {
        // Last resort: wall-clock since host hit play
        totalSeconds = hostStartTsRef.current ? (Date.now() - hostStartTsRef.current) / 1000 : 0;
      }
    }
    totalSeconds = Math.max(0, totalSeconds);
    const newStartTs = Date.now() - (totalSeconds * 1000);
    hostStartTsRef.current = newStartTs;
    setWtPlayStartTime(newStartTs);
    setWtShowSyncInput(false);
    setWtSyncMinutes('');
    setWtSyncSeconds('');
    if (conn && conn.open) {
      conn.send({ type: 'HOST_SEEKED', currentTime: totalSeconds });
    }
    const m = Math.floor(totalSeconds / 60), s = Math.floor(totalSeconds % 60);
    setWtStatus(`📡 Synced guest to ${fmtHMS(totalSeconds)}`);
  };

  const wtGuestSync = () => {
    // Always use the freshest timestamp from the ref (updated by heartbeats)
    const ts = guestStartTsRef.current || wtPlayStartTime;
    if (!wtMovie || !ts) {
      // No timestamp at all — just load from beginning
      setWtVideoLoaded(false);
      setTimeout(() => { setWtVideoLoaded(true); setWtIframeKey(k => k + 1); }, 200);
      return;
    }
    doGuestResync(ts, false);
  };

  const sendWtChat = () => {
    if (!wtChatInput.trim() || !conn || !conn.open) return;
    conn.send({ type: 'CHAT', text: wtChatInput });
    setWtChatMessages(prev => [...prev, {
      from: 'me',
      text: wtChatInput,
      time: fmtChatTime()
    }]);
    setWtChatInput('');
  };

  const syncAndPlay = (movie) => {
    setSelectedMovie(movie);
    if (conn && conn.open) {
      conn.send({ type: 'SYNC_MOVIE', movie });
    }
  };

  // AI Logic
  // ... (Your existing imports and constants)

const askAI = async () => {
  if (!chatInput.trim() || isTyping) return;
  const now = fmtChatTime();
  // Inject current date+time so the AI always knows the exact moment
  const nowFull = new Date().toLocaleString('en-PH', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });
  const userMsg = { 
    role: 'user', 
    content: chatInput,
    timestamp: now
  };
  // Prepend a system-context message with the real current time
  const contextMsg = {
    role: 'user',
    content: `[Context: The current date and time is ${nowFull}. Use this to answer any time-sensitive questions accurately.]`
  };
  const updatedHistory = [...messages, contextMsg, userMsg];
  
  setMessages(prev => [...prev, userMsg]);
  setChatInput('');
  setIsTyping(true);

  try {
  const response = await fetch(`${BACKEND_URL}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: updatedHistory }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.reply) {
    const cleanReply = data.reply.replace(/:::thinking[\s\S]*?:::/g, '').trim();
    const botMsg = { 
      role: 'assistant', 
      content: cleanReply || "I'm not sure how to answer that.",
      timestamp: fmtChatTime() 
    };
    setMessages(prev => [...prev, botMsg]);
  } else {
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: "I couldn't find any info on that. Try asking something else!",
      timestamp: fmtChatTime()
    }]);
  }
} catch (error) {
  console.error("Network/Server Error:", error);
  setMessages(prev => [...prev, { 
    role: 'assistant', 
    content: 'Connection lost. Please check if the Termux server is running.',
    timestamp: fmtChatTime()
  }]);
} finally {
  setIsTyping(false);
}};


  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedSearch(search); }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomId || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleYearFromChange = (text) => {
    const val = text.replace(/[^0-9]/g, '');
    if (parseInt(val) > CURRENT_YEAR) { setYearFrom(CURRENT_YEAR.toString()); return; }
    setYearFrom(val);
    if (val.length === 4 && parseInt(yearTo) < parseInt(val)) { setYearTo(val); }
  };

  const handleYearToChange = (text) => {
    const val = text.replace(/[^0-9]/g, '');
    const numVal = parseInt(val);
    if (numVal > CURRENT_YEAR) { setYearTo(CURRENT_YEAR.toString()); return; }
    if (val.length === 4 && numVal < parseInt(yearFrom)) { setYearTo(yearFrom); return; }
    setYearTo(val);
  };

  const getGenreNames = (ids) => {
    if (!ids) return [];
    return ids.map(id => GENRES.find(g => g.id === id)?.name).filter(Boolean);
  };

  // Fetch IMDB ID when movie is selected or server changes to GoDrive
  useEffect(() => {
    const currentServer = SERVERS[selectedServer];
    if (!currentServer.needsImdb || !selectedMovie) {
      setImdbId(null);
      return;
    }
    const fetchImdbId = async () => {
      setImdbLoading(true);
      try {
        const type = selectedMovie.type || 'movie';
        const res = await fetch(`${BACKEND_URL}/api/movies/external_ids?type=${type}&id=${selectedMovie.tmdbId}`);
        const data = await res.json();
        setImdbId(data.imdb_id || null);
      } catch (e) {
        console.error('Failed to fetch IMDB ID:', e);
        setImdbId(null);
      } finally {
        setImdbLoading(false);
      }
    };
    fetchImdbId();
  }, [selectedMovie, selectedServer]);

  const fetchHero = async () => {
    try {
      let region = "PH";
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        if (geoData.country_code) region = geoData.country_code;
      } catch (geoErr) { console.log("Geo lookup failed, defaulting to PH"); }

      const url = `${BACKEND_URL}/api/movies/trending?region=${region}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setHeroMovies(data.results.slice(0, 10).map(m => ({
          id: m.id.toString(),
          title: m.title || m.name,
          banner: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          tmdbId: m.id,
          type: m.name ? 'tv' : 'movie',
          releaseDate: m.release_date || m.first_air_date,
          synopsis: m.overview,
          rating: m.vote_average,
          genreIds: m.genre_ids
        })));
      }
    } catch (e) { console.error("Hero Fetch Error:", e); }
  };

  // ── FETCH COMING SOON ─────────────────────────────────
  const fetchComingSoon = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const type = activeTab === 'Series' ? 'tv' : 'movie';
      const dateParam = type === 'movie' ? 'primary_release_date' : 'first_air_date';
      const url = `${BACKEND_URL}/api/movies/discover?type=${type}&page=1&sort_by=popularity.desc&${dateParam}.gte=${today}&${dateParam}.lte=${future}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results) {
        const grouped: Record<string, any[]> = {};
        data.results.slice(0, 20).forEach(m => {
          const d = m.release_date || m.first_air_date || '';
          if (!d) return;
          const label = new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
          if (!grouped[label]) grouped[label] = [];
          grouped[label].push({
            id: m.id.toString(), title: m.title || m.name,
            poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
            banner: m.backdrop_path ? `https://image.tmdb.org/t/p/w780${m.backdrop_path}` : '',
            tmdbId: m.id, type,
            releaseDate: m.release_date || m.first_air_date || '',
            synopsis: m.overview || '', rating: m.vote_average,
            genreIds: m.genre_ids, popularity: m.popularity
          });
        });
        setComingSoon(Object.entries(grouped).map(([date, items]) => ({ date, items })));
      }
    } catch(e) { console.error('Coming Soon error:', e); }
  };

  // ── FETCH LEADERBOARD (top by popularity) ─────────────
  const fetchLeaderboard = async () => {
    try {
      const type = activeTab === 'Series' ? 'tv' : 'movie';
      const url = `${BACKEND_URL}/api/movies/discover?type=${type}&page=1&sort_by=popularity.desc`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results) {
        setLeaderboard(data.results.slice(0, 20).map((m, i) => ({
          rank: i + 1, id: m.id.toString(), title: m.title || m.name,
          poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
          tmdbId: m.id, type,
          releaseDate: m.release_date || m.first_air_date || '',
          synopsis: m.overview || '', rating: m.vote_average,
          genreIds: m.genre_ids,
          score: Math.round(m.popularity * 100),
          banner: m.backdrop_path ? `https://image.tmdb.org/t/p/w780${m.backdrop_path}` : '',
        })));
      }
    } catch(e) { console.error('Leaderboard error:', e); }
  };

  // ── FETCH CATEGORY ROWS (Netflix-style) ───────────────
  const CATEGORY_DEFS = [
    { title: 'Trending Now',       icon: 'fa-fire',                iconColor: '#ef4444', genre: null,  sort: 'popularity.desc' },
    { title: 'Top Rated',          icon: 'fa-trophy',              iconColor: '#f59e0b', genre: null,  sort: 'vote_average.desc', minVotes: 200 },
    { title: 'Drama',              icon: 'fa-masks-theater',       iconColor: '#8b5cf6', genre: 18,   sort: 'popularity.desc' },
    { title: 'Comedy',             icon: 'fa-face-laugh',          iconColor: '#f59e0b', genre: 35,   sort: 'popularity.desc' },
    { title: 'Horror',             icon: 'fa-skull',               iconColor: '#dc2626', genre: 27,   sort: 'popularity.desc' },
    { title: 'Action',             icon: 'fa-bolt',                iconColor: '#f97316', genre: 28,   sort: 'popularity.desc' },
    { title: 'Romance',            icon: 'fa-heart',               iconColor: '#ec4899', genre: 10749, sort: 'popularity.desc' },
    { title: 'K-Drama',            icon: 'fa-star',                iconColor: '#06b6d4', genre: 18,   sort: 'popularity.desc', country: 'KR' },
    { title: 'Filipino',           icon: 'fa-sun',                 iconColor: '#fbbf24', genre: null,  sort: 'popularity.desc', country: 'PH' },
    { title: 'Anime',              icon: 'fa-wand-magic-sparkles', iconColor: '#a78bfa', genre: 16,   sort: 'popularity.desc', country: 'JP' },
    { title: 'Sci-Fi',             icon: 'fa-rocket',              iconColor: '#38bdf8', genre: 878,  sort: 'popularity.desc' },
    { title: 'Mystery & Thriller', icon: 'fa-magnifying-glass',    iconColor: '#94a3b8', genre: 53,   sort: 'popularity.desc' },
  ];

  const fetchCategoryRows = async () => {
    setRowsLoading(true);
    const type = activeTab === 'Series' ? 'tv' : 'movie';
    try {
      const results = await Promise.all(
        CATEGORY_DEFS.map(async (cat) => {
          let url = `${BACKEND_URL}/api/movies/discover?type=${type}&page=1&sort_by=${cat.sort}`;
          if (cat.genre) url += `&with_genres=${cat.genre}`;
          if ((cat as any).country) url += `&with_origin_country=${(cat as any).country}`;
          if ((cat as any).minVotes) url += `&vote_count.gte=${(cat as any).minVotes}`;
          const res = await fetch(url);
          const data = await res.json();
          const items = (data.results || []).slice(0, 20).map(m => ({
            id: m.id.toString(), title: m.title || m.name,
            poster: m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : '',
            banner: m.backdrop_path ? `https://image.tmdb.org/t/p/w780${m.backdrop_path}` : '',
            tmdbId: m.id, type,
            releaseDate: m.release_date || m.first_air_date || '',
            synopsis: m.overview || '', rating: m.vote_average,
            genreIds: m.genre_ids
          }));
          return { title: cat.title, icon: (cat as any).icon, iconColor: (cat as any).iconColor, genre: cat.genre, type, items };
        })
      );
      setCategoryRows(results.filter(r => r.items.length > 0));
    } catch(e) { console.error('Category rows error:', e); }
    finally { setRowsLoading(false); }
  };


  useEffect(() => {
    if (heroMovies.length > 0) {
      const interval = setInterval(() => {
        setHeroIndex((prev) => {
          const next = (prev + 1) % heroMovies.length;
          sliderRef.current?.scrollTo({ x: next * width, animated: true });
          return next;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroMovies.length, width]);

  const fetchMovies = async () => {
    setLoading(true);
    let type = (activeTab === 'Series') ? 'tv' : 'movie';
    const tmdbBase = ((groupPage - 1) * 3);
    const pagesToFetch = [1, 2, 3]; 
    
    try {
      let allResults = [];
      let lastHasMore = true;
      let apiTotalPages = MAX_TMDB_PAGES;

      for (const pOffset of pagesToFetch) {
        const fetchPage = tmdbBase + pOffset;
        if (fetchPage > MAX_TMDB_PAGES * 3) break; 
        
        // 1. Initialize with Default (Discovery)
        let url = `${BACKEND_URL}/api/movies/discover?type=${type}&page=${fetchPage}`;

        // 2. Overwrite if Searching or on Trending tab
        if (debouncedSearch.length > 2) {
          url = `${BACKEND_URL}/api/movies/search?type=${type}&query=${encodeURIComponent(debouncedSearch)}&page=${fetchPage}`;
        } else if (activeTab === 'Trending') {
          // Trending respects filters: if any filter is active use discover sorted by popularity, else top_rated
          const hasFilter = selectedGenre || selectedCountry || yearFrom !== '1990' || yearTo !== CURRENT_YEAR.toString() || monthFrom !== '01' || monthTo !== '12';
          if (hasFilter) {
            url = `${BACKEND_URL}/api/movies/discover?type=${type}&page=${fetchPage}&sort_by=popularity.desc`;
          } else {
            url = `${BACKEND_URL}/api/movies/top_rated?page=${fetchPage}`;
          }
        }

        // 3. Append Filters (Only for Discovery/Trending, as Search API often ignores these)
        if (debouncedSearch.length <= 2) {
          if (selectedGenre) {
            let genreId = selectedGenre;
            if (type === 'movie') {
              if (genreId === 10765) genreId = 878;
              if (genreId === 10759) genreId = 28;
            } else {
              if (genreId === 878) genreId = 10765;
              if (genreId === 28) genreId = 10759;
              if (genreId === 12) genreId = 10759;
              if (genreId === 53) genreId = 9648; 
              if (genreId === 14) genreId = 10765;
            }
            url += `&with_genres=${genreId}`;
          }

          if (selectedCountry) url += `&with_origin_country=${selectedCountry}`;
          const dateParam = type === 'movie' ? 'primary_release_date' : 'first_air_date';
          url += `&${dateParam}.gte=${yearFrom || '1900'}-${monthFrom}-01`;
          url += `&${dateParam}.lte=${yearTo || CURRENT_YEAR}-${monthTo}-28`;
        }
        
        // 4. Fetch from your Backend Proxy
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.total_pages) {
            apiTotalPages = Math.min(MAX_TMDB_PAGES, Math.ceil(data.total_pages / 3));
        }

        if (data.results && data.results.length > 0) {
          const formatted = data.results.map(m => ({
            id: m.id.toString(),
            title: m.title || m.name,
            poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
            banner: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : null,
            tmdbId: m.id,
            type: type,
            rating: m.vote_average,
            releaseDate: m.release_date || m.first_air_date || "Unknown",
            synopsis: m.overview || "No description available.",
            genreIds: m.genre_ids
          }));
          allResults = [...allResults, ...formatted];
          lastHasMore = data.results.length === 20;
        } else {
          lastHasMore = false;
          break;
        }
      }
      setMovies(allResults);
      setHasMore(lastHasMore);
      setTotalPages(apiTotalPages);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchHero(); 
    fetchMovies();
    if (activeTab === 'Home') {
      fetchCategoryRows();
      fetchComingSoon();
      fetchLeaderboard();
    }
    setPageInput(groupPage.toString());
  }, [activeTab, selectedGenre, selectedCountry, yearFrom, yearTo, monthFrom, monthTo, debouncedSearch, groupPage]);

  const jumpToPage = () => {
    const p = Math.min(Math.max(1, parseInt(pageInput)), totalPages);
    setGroupPage(p);
    setPageInput(p.toString());
  };

  const handleOnScroll = (e) => {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
    if (slide !== heroIndex) setHeroIndex(slide);
  };

  const filteredGenres = GENRES.filter(g => g.name.toLowerCase().includes(genreSearch.toLowerCase()));

  return (
    <div style={{ flex: 1, background: 'var(--bg-primary)', overflow: 'hidden', maxWidth: '100vw', display: 'flex', flexDirection: 'column', minHeight: '100vh' } as any}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;900&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

        :root {
          --bg-primary: #080e17;
          --bg-secondary: #0d1623;
          --bg-card: #111c2d;
          --bg-elevated: #162033;
          --accent: #4f8ef7;
          --accent-glow: rgba(79,142,247,0.25);
          --accent-dim: #2a5cbf;
          --green: #22c55e;
          --red: #ef4444;
          --gold: #f59e0b;
          --text-primary: #f0f4ff;
          --text-secondary: #8a9bb5;
          --text-muted: #3d5070;
          --border: #1a2740;
          --border-light: #243350;
          --radius: 10px;
          --radius-lg: 16px;
          --font-display: 'Bebas Neue', sans-serif;
          --font-body: 'Outfit', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root {
          background: var(--bg-primary);
          font-family: var(--font-body);
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
          -webkit-font-smoothing: antialiased;
        }
        iframe { -webkit-overflow-scrolling: touch; border: none !important; }
        video { -webkit-playsinline: true; playsinline: true; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg-primary); }
        ::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }
        input, textarea { font-family: var(--font-body); }

        /* ── HEADER ── */
        .cx-header {
          background: linear-gradient(180deg, #0a1525 0%, rgba(10,21,37,0.95) 100%);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 200;
          padding: 0 20px;
        }
        .cx-header-top {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 0; width: 100%;
        }
        .cx-logo {
          font-family: var(--font-display);
          font-size: 28px; letter-spacing: 2px;
          color: var(--text-primary);
          flex-shrink: 0; line-height: 1;
          text-shadow: 0 0 20px var(--accent-glow);
        }
        .cx-logo span { color: var(--accent); }
        .cx-search-wrap {
          flex: 1; position: relative; min-width: 0;
        }
        .cx-search-wrap i {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted); font-size: 13px; pointer-events: none;
        }
        .cx-search {
          width: 100%; background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary);
          padding: 9px 14px 9px 38px;
          border-radius: 25px; font-size: 13px;
          font-family: var(--font-body);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .cx-search:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
        .cx-search::placeholder { color: var(--text-muted); }

        /* ── NAV ── */
        .cx-nav { display: flex; gap: 4px; padding: 0 0 10px; overflow-x: auto; }
        .cx-nav::-webkit-scrollbar { display: none; }
        .cx-nav-btn {
          background: none; border: none; cursor: pointer;
          color: var(--text-secondary); font-family: var(--font-body);
          font-size: 13px; font-weight: 600; letter-spacing: 0.3px;
          padding: 7px 14px; border-radius: 8px;
          white-space: nowrap; display: flex; align-items: center; gap: 6px;
          transition: all 0.2s; flex-shrink: 0;
        }
        .cx-nav-btn:hover { color: var(--text-primary); background: var(--bg-elevated); }
        .cx-nav-btn.active { color: var(--accent); background: var(--accent-glow); }
        .cx-nav-btn.live { color: var(--green); }
        .cx-nav-btn i { font-size: 12px; }

        /* ── FILTER DRAWER ── */
        .cx-filter-drawer {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          padding: 16px 20px; max-height: 380px; overflow-y: auto;
        }
        .cx-filter-label {
          color: var(--text-muted); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.2px;
          margin: 14px 0 8px; display: flex; align-items: center; gap: 6px;
        }
        .cx-filter-label i { font-size: 10px; color: var(--accent); }
        .cx-chip-row { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; }
        .cx-chip-row::-webkit-scrollbar { display: none; }
        .cx-chip {
          background: var(--bg-card); border: 1px solid var(--border);
          color: var(--text-secondary); padding: 6px 14px;
          border-radius: 20px; font-size: 12px; font-family: var(--font-body);
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: all 0.15s;
        }
        .cx-chip:hover { border-color: var(--accent); color: var(--text-primary); }
        .cx-chip.active { border-color: var(--accent); background: var(--accent-glow); color: var(--accent); font-weight: 600; }
        .cx-date-row { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
        .cx-date-input {
          background: var(--bg-card); border: 1px solid var(--border);
          color: var(--text-primary); padding: 8px 12px;
          border-radius: var(--radius); width: 90px; text-align: center;
          font-size: 13px; font-family: var(--font-body); outline: none;
        }
        .cx-date-input:focus { border-color: var(--accent); }
        .cx-reset-btn {
          background: rgba(239,68,68,0.08); border: 1px solid var(--red);
          color: var(--red); padding: 10px 20px; border-radius: 25px;
          font-size: 12px; font-weight: 600; font-family: var(--font-body);
          cursor: pointer; margin-top: 16px; margin-bottom: 8px;
          display: flex; align-items: center; gap: 6px; width: 100%;
          justify-content: center; transition: all 0.2s;
        }
        .cx-reset-btn:hover { background: rgba(239,68,68,0.18); }
        .cx-genre-search {
          background: var(--bg-card); border: 1px solid var(--border);
          color: var(--text-primary); padding: 6px 12px;
          border-radius: 15px; font-size: 11px; font-family: var(--font-body);
          width: 130px; outline: none;
        }
        .cx-filter-row-header { display: flex; justify-content: space-between; align-items: center; }

        /* ── HERO ── */
        .cx-hero { position: relative; width: 100%; overflow: hidden; background: #000; }
        .cx-hero-badge {
          position: absolute; top: 16px; left: 16px; z-index: 10;
          background: rgba(10,21,37,0.7); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 5px 12px; border-radius: 20px;
          display: flex; align-items: center; gap: 6px;
        }
        .cx-hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ff4b4b;
          animation: blink 1.5s infinite;
        }
        .cx-hero-badge-text {
          color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 1px;
          font-family: var(--font-body);
        }
        .cx-hero-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(0deg, rgba(8,14,23,1) 0%, rgba(8,14,23,0.7) 40%, transparent 100%);
          padding: 40px 24px 50px;
        }
        .cx-hero-rank {
          font-family: var(--font-display);
          font-size: 90px; color: rgba(255,255,255,0.12);
          line-height: 0.85; float: left; margin-right: 16px;
        }
        .cx-hero-title {
          font-family: var(--font-display);
          font-size: 32px; letter-spacing: 1px;
          color: #fff; line-height: 1; margin-bottom: 8px;
        }
        .cx-hero-meta { color: var(--text-secondary); font-size: 12px; margin-bottom: 10px; }
        .cx-hero-synopsis { color: #aab; font-size: 13px; line-height: 1.5; margin-bottom: 16px; }
        .cx-hero-play-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--accent); color: #fff;
          padding: 10px 20px; border-radius: 8px;
          font-size: 13px; font-weight: 700; border: none; cursor: pointer;
          font-family: var(--font-body); letter-spacing: 0.5px;
          transition: all 0.2s; box-shadow: 0 4px 20px var(--accent-glow);
        }
        .cx-hero-play-btn:hover { background: #6aa0ff; transform: translateY(-1px); }
        .cx-hero-dots {
          position: absolute; bottom: 14px; left: 0; right: 0;
          display: flex; justify-content: center; gap: 6px; z-index: 5;
        }
        .cx-dot { width: 6px; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.25); transition: all 0.3s; }
        .cx-dot.active { width: 20px; background: var(--accent); }

        /* ── MOVIE GRID ── */
        .cx-section { padding: 16px; min-height: 300px; }
        .cx-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .cx-card {
          cursor: pointer; position: relative; border-radius: var(--radius);
          overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;
        }
        .cx-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 30px rgba(0,0,0,0.6); }
        .cx-card:hover .cx-card-overlay { opacity: 1; }
        .cx-card-overlay {
          position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.9) 100%);
          opacity: 0; transition: opacity 0.2s;
          display: flex; align-items: flex-end; padding: 10px;
        }
        .cx-card-play {
          width: 36px; height: 36px; background: var(--accent);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 6px;
        }
        .cx-card-play i { color: #fff; font-size: 13px; margin-left: 2px; }
        .cx-card-title {
          color: var(--text-secondary); font-size: 11px;
          text-align: center; margin-top: 6px; padding: 0 2px;
          font-family: var(--font-body);
        }
        .cx-rating-badge {
          position: absolute; top: 6px; right: 6px;
          background: rgba(0,0,0,0.75); backdrop-filter: blur(4px);
          border-radius: 6px; padding: 3px 7px;
          color: var(--gold); font-size: 10px; font-weight: 700;
          display: flex; align-items: center; gap: 3px;
        }

        /* ── PAGINATION ── */
        .cx-pagination {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px; margin-top: 24px; gap: 10px;
        }
        .cx-page-btn {
          background: var(--accent); color: #fff; border: none;
          padding: 10px 20px; border-radius: 8px; font-size: 12px;
          font-weight: 700; font-family: var(--font-body); cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: all 0.2s; letter-spacing: 0.5px;
        }
        .cx-page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .cx-page-btn:not(:disabled):hover { background: #6aa0ff; }
        .cx-page-info { display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 12px; }
        .cx-page-input {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-primary); padding: 6px 8px;
          width: 50px; text-align: center; border-radius: 6px;
          font-size: 13px; font-family: var(--font-body); outline: none;
        }
        .cx-page-input:focus { border-color: var(--accent); }

        /* ── MODAL ── */
        .cx-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.88);
          z-index: 1000; display: flex; align-items: center; justify-content: center;
          padding: 12px; backdrop-filter: blur(6px);
        }
        .cx-modal {
          width: 100%; max-width: 720px; background: var(--bg-secondary);
          border-radius: var(--radius-lg); overflow: hidden;
          border: 1px solid var(--border); position: relative;
          max-height: 92vh; display: flex; flex-direction: column;
        }
        .cx-modal-close {
          position: absolute; top: 12px; right: 12px; z-index: 30;
          background: rgba(0,0,0,0.6); border: 1px solid var(--border);
          color: var(--text-secondary); width: 36px; height: 36px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px; transition: all 0.2s; border: none;
        }
        .cx-modal-close:hover { background: var(--red); color: #fff; }
        .cx-modal-banner { width: 100%; height: 220px; object-fit: cover; display: block; }
        .cx-modal-body { padding: 20px; overflow-y: auto; flex: 1; }
        .cx-modal-title {
          font-family: var(--font-display);
          font-size: 30px; letter-spacing: 1px; color: var(--text-primary);
          line-height: 1; margin-bottom: 10px;
        }
        .cx-modal-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cx-modal-date { color: var(--text-muted); font-size: 12px; display: flex; align-items: center; gap: 5px; }
        .cx-modal-rating { color: var(--gold); font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 5px; }
        .cx-genre-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .cx-genre-tag {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-secondary); padding: 4px 10px;
          border-radius: 6px; font-size: 11px; font-weight: 600;
        }
        .cx-synopsis { color: var(--text-secondary); font-size: 13px; line-height: 1.6; margin-bottom: 20px; }
        .cx-server-badge {
          background: var(--bg-card); border-left: 3px solid var(--accent);
          padding: 10px 14px; border-radius: 0 var(--radius) var(--radius) 0;
          margin-bottom: 20px; display: flex; align-items: center; gap: 8px;
        }
        .cx-server-badge-text { color: var(--text-muted); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .cx-server-badge-val { color: var(--accent); font-size: 11px; font-weight: 700; }
        .cx-watch-btn {
          width: 100%; background: linear-gradient(135deg, var(--accent), var(--accent-dim));
          color: #fff; border: none; padding: 16px; border-radius: 30px;
          font-size: 15px; font-weight: 700; font-family: var(--font-body);
          cursor: pointer; letter-spacing: 1px; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          box-shadow: 0 6px 24px var(--accent-glow); transition: all 0.2s;
        }
        .cx-watch-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 30px var(--accent-glow); }

        /* ── PLAYER CONTROLS BAR ── */
        .cx-player-bar {
          background: var(--bg-secondary); border-top: 1px solid var(--border);
          padding: 14px 16px;
        }
        .cx-server-label {
          color: var(--text-muted); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px;
          display: flex; align-items: center; gap: 6px;
        }
        .cx-server-label i { color: var(--accent); font-size: 10px; }
        .cx-server-row { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; }
        .cx-server-row::-webkit-scrollbar { display: none; }
        .cx-server-btn {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-secondary); padding: 7px 14px;
          border-radius: 20px; font-size: 12px; font-weight: 600;
          font-family: var(--font-body); cursor: pointer; white-space: nowrap;
          flex-shrink: 0; transition: all 0.15s;
          display: flex; align-items: center; gap: 6px;
        }
        .cx-server-btn:hover { border-color: var(--accent); color: var(--text-primary); }
        .cx-server-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
        .cx-promo-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 12px; gap: 10px; flex-wrap: wrap;
        }
        .cx-promo-text { color: var(--text-muted); font-size: 11px; flex: 1; min-width: 180px; }
        .cx-copy-btn {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-secondary); padding: 8px 16px;
          border-radius: 20px; font-size: 11px; font-weight: 600;
          font-family: var(--font-body); cursor: pointer; white-space: nowrap;
          display: flex; align-items: center; gap: 6px; transition: all 0.2s;
        }
        .cx-copy-btn.copied { background: rgba(34,197,94,0.15); border-color: var(--green); color: var(--green); }
        .cx-copy-btn:hover:not(.copied) { border-color: var(--accent); color: var(--accent); }

        /* ── WATCH TOGETHER ── */
        .cx-wt-topbar {
          background: var(--bg-secondary); border-bottom: 1px solid var(--border);
          padding: 12px 16px; display: flex; align-items: center;
          justify-content: space-between; flex-shrink: 0;
        }
        .cx-wt-back {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-secondary); width: 34px; height: 34px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px; transition: all 0.2s; border: none;
        }
        .cx-wt-back:hover { border-color: var(--accent); color: var(--accent); }
        .cx-wt-title { color: var(--text-primary); font-weight: 700; font-size: 15px; }
        .cx-wt-status-text { font-size: 10px; margin-top: 2px; }
        .cx-leave-btn {
          background: rgba(239,68,68,0.1); border: 1px solid var(--red);
          color: var(--red); padding: 7px 14px; border-radius: 20px;
          font-size: 11px; font-weight: 600; font-family: var(--font-body);
          cursor: pointer; display: flex; align-items: center; gap: 5px;
          transition: all 0.2s;
        }
        .cx-leave-btn:hover { background: rgba(239,68,68,0.2); }
        .cx-status-banner {
          padding: 8px 16px; border-bottom: 1px solid;
          display: flex; align-items: center; gap: 8px; flex-shrink: 0;
        }
        .cx-room-card {
          background: var(--bg-card); border-radius: var(--radius-lg);
          padding: 16px; border: 1px solid var(--border);
        }
        .cx-room-card-title {
          color: var(--text-primary); font-weight: 700; font-size: 14px;
          margin-bottom: 4px; display: flex; align-items: center; gap: 8px;
        }
        .cx-room-card-title i { color: var(--accent); font-size: 13px; }
        .cx-room-card-desc { color: var(--text-muted); font-size: 12px; line-height: 1.5; margin-bottom: 14px; }
        .cx-create-btn {
          width: 100%; background: linear-gradient(135deg, var(--accent), var(--accent-dim));
          color: #fff; border: none; padding: 14px; border-radius: 25px;
          font-size: 14px; font-weight: 700; font-family: var(--font-body);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 8px; transition: all 0.2s; box-shadow: 0 4px 16px var(--accent-glow);
        }
        .cx-create-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
        .cx-create-btn:not(:disabled):hover { transform: translateY(-1px); }
        .cx-join-btn {
          width: 100%; background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff; border: none; padding: 14px; border-radius: 25px;
          font-size: 14px; font-weight: 700; font-family: var(--font-body);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 8px; transition: all 0.2s; box-shadow: 0 4px 16px rgba(22,163,74,0.3);
        }
        .cx-join-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
        .cx-join-btn:not(:disabled):hover { transform: translateY(-1px); }
        .cx-room-id-box {
          background: var(--bg-primary); border: 1px solid var(--accent);
          border-radius: var(--radius); padding: 12px 14px; margin-bottom: 12px;
        }
        .cx-room-id-label { color: var(--text-muted); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .cx-room-id-val { color: var(--accent); font-size: 12px; font-weight: 600; word-break: break-all; }
        .cx-room-actions { display: flex; gap: 8px; }
        .cx-copy-room-btn {
          flex: 1; background: var(--accent); color: #fff; border: none;
          padding: 12px; border-radius: 20px; font-size: 12px; font-weight: 700;
          font-family: var(--font-body); cursor: pointer; display: flex;
          align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;
        }
        .cx-copy-room-btn.copied { background: var(--green); }
        .cx-cancel-btn {
          background: rgba(239,68,68,0.1); border: 1px solid var(--red);
          color: var(--red); padding: 12px 16px; border-radius: 20px;
          font-size: 12px; font-weight: 600; font-family: var(--font-body);
          cursor: pointer; transition: all 0.2s;
        }
        .cx-waiting-row { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
        .cx-waiting-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); animation: blink 1.5s infinite; flex-shrink: 0; }
        .cx-join-input {
          width: 100%; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); border-radius: var(--radius);
          padding: 12px 14px; font-size: 13px; font-family: var(--font-body);
          outline: none; margin-bottom: 12px;
        }
        .cx-join-input:focus { border-color: var(--accent); }
        .cx-divider { display: flex; align-items: center; gap: 12px; margin: 4px 0; }
        .cx-divider-line { flex: 1; height: 1px; background: var(--border); }
        .cx-divider-text { color: var(--text-muted); font-size: 11px; }
        .cx-howto-card {
          background: var(--bg-card); border-radius: var(--radius-lg);
          padding: 16px; border: 1px solid var(--border);
        }
        .cx-howto-title {
          color: var(--accent); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px;
          display: flex; align-items: center; gap: 6px;
        }
        .cx-howto-step { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
        .cx-howto-num {
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--accent-glow); border: 1px solid var(--accent);
          color: var(--accent); font-size: 10px; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
        }
        .cx-howto-text { color: var(--text-secondary); font-size: 12px; line-height: 1.5; }
        .cx-connected-strip {
          background: rgba(34,197,94,0.08); border-bottom: 1px solid rgba(34,197,94,0.2);
          padding: 10px 16px; display: flex; align-items: center;
          justify-content: space-between; flex-shrink: 0;
        }
        .cx-connected-role { color: var(--green); font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px; }
        .cx-connected-sub { color: rgba(34,197,94,0.6); font-size: 10px; margin-top: 1px; }
        .cx-sync-btn {
          background: rgba(34,197,94,0.12); border: 1px solid var(--green);
          color: var(--green); padding: 6px 12px; border-radius: 15px;
          font-size: 10px; font-weight: 700; font-family: var(--font-body);
          cursor: pointer; display: flex; align-items: center; gap: 5px;
        }
        .cx-change-btn {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-secondary); padding: 6px 12px; border-radius: 15px;
          font-size: 10px; font-weight: 600; font-family: var(--font-body);
          cursor: pointer; display: flex; align-items: center; gap: 5px;
        }
        .cx-chat-messages { flex: 1; overflow-y: auto; padding: 12px; background: var(--bg-primary); }
        .cx-chat-msg { margin-bottom: 8px; display: flex; flex-direction: column; }
        .cx-chat-msg.me { align-items: flex-end; }
        .cx-chat-msg.friend { align-items: flex-start; }
        .cx-chat-bubble {
          max-width: 80%; padding: 8px 12px; border-radius: 14px; font-size: 12px;
          font-family: var(--font-body); line-height: 1.4;
        }
        .cx-chat-bubble.me { background: var(--accent); color: #fff; border-bottom-right-radius: 4px; }
        .cx-chat-bubble.friend { background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border); border-bottom-left-radius: 4px; }
        .cx-chat-time { color: var(--text-muted); font-size: 9px; margin-top: 3px; }
        .cx-chat-input-row {
          display: flex; gap: 8px; padding: 12px;
          background: var(--bg-secondary); border-top: 1px solid var(--border); flex-shrink: 0;
        }
        .cx-chat-input {
          flex: 1; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); border-radius: 25px;
          padding: 9px 16px; font-size: 12px; font-family: var(--font-body); outline: none;
        }
        .cx-chat-input:focus { border-color: var(--accent); }
        .cx-send-btn {
          background: var(--accent); border: none; color: #fff;
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px; flex-shrink: 0; transition: all 0.2s;
        }
        .cx-send-btn:hover { background: #6aa0ff; }

        /* ── AI CHAT ── */
        .cx-ai-fab {
          position: fixed; right: 20px; bottom: 24px; z-index: 998;
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-dim));
          border: 1.5px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 24px var(--accent-glow);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .cx-ai-fab:hover { transform: scale(1.08); box-shadow: 0 12px 32px rgba(79,142,247,0.5); }
        .cx-ai-fab i { color: #fff; font-size: 22px; }
        .cx-ai-online-dot {
          position: absolute; bottom: 8px; right: 7px;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--green); border: 2px solid var(--accent-dim);
        }
        .cx-ai-peek {
          position: fixed; right: -36px; bottom: 120px; z-index: 997;
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-dim));
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .cx-ai-peek i { color: #fff; font-size: 20px; }
        .cx-ai-header {
          background: var(--bg-secondary); border-bottom: 1px solid var(--border);
          padding: 14px 16px; display: flex; align-items: center;
          justify-content: space-between; flex-shrink: 0;
        }
        .cx-ai-header-left { display: flex; align-items: center; gap: 12px; }
        .cx-ai-icon {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-dim));
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cx-ai-icon i { color: #fff; font-size: 18px; }
        .cx-ai-name { color: var(--accent); font-weight: 800; font-size: 16px; }
        .cx-ai-name span { color: var(--text-primary); }
        .cx-ai-online { color: var(--green); font-size: 10px; margin-top: 1px; display: flex; align-items: center; gap: 4px; }
        .cx-ai-clear {
          background: none; border: none; color: var(--red);
          font-size: 11px; font-weight: 700; font-family: var(--font-body);
          cursor: pointer; padding: 6px 10px; border-radius: 8px;
          transition: all 0.2s;
        }
        .cx-ai-clear:hover { background: rgba(239,68,68,0.1); }
        .cx-ai-messages { flex: 1; overflow-y: auto; padding: 16px; background: var(--bg-primary); }
        .cx-ai-msg { margin-bottom: 16px; display: flex; flex-direction: column; }
        .cx-ai-msg.user { align-items: flex-end; }
        .cx-ai-msg.bot { align-items: flex-start; }
        .cx-ai-bubble {
          max-width: 85%; padding: 11px 14px; border-radius: 18px;
          font-size: 13px; line-height: 1.5; font-family: var(--font-body);
        }
        .cx-ai-bubble.user { background: var(--accent); color: #fff; border-bottom-right-radius: 4px; }
        .cx-ai-bubble.bot { background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border); border-bottom-left-radius: 4px; }
        .cx-ai-time { color: var(--text-muted); font-size: 9px; margin-top: 4px; font-weight: 600; text-transform: uppercase; }
        .cx-quick-row {
          padding: 8px 12px; background: var(--bg-secondary);
          border-top: 1px solid var(--border); display: flex; gap: 6px; overflow-x: auto;
          flex-shrink: 0;
        }
        .cx-quick-row::-webkit-scrollbar { display: none; }
        .cx-quick-chip {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-secondary); padding: 6px 12px;
          border-radius: 15px; font-size: 11px; font-family: var(--font-body);
          cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all 0.15s;
        }
        .cx-quick-chip:hover { border-color: var(--accent); color: var(--accent); }
        .cx-ai-input-row {
          display: flex; gap: 8px; padding: 12px 16px;
          background: var(--bg-secondary); border-top: 1px solid var(--border); flex-shrink: 0;
        }
        .cx-ai-input {
          flex: 1; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); border-radius: 25px;
          padding: 10px 18px; font-size: 13px; font-family: var(--font-body);
          outline: none; height: 44px;
        }
        .cx-ai-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
        .cx-ai-send {
          background: var(--accent); border: none; color: #fff;
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 15px; flex-shrink: 0; transition: all 0.2s;
        }
        .cx-ai-send:hover { background: #6aa0ff; transform: scale(1.05); }

        /* ── PICKER ── */
        .cx-picker-header {
          background: var(--bg-secondary); padding: 16px;
          border-bottom: 1px solid var(--border); flex-shrink: 0;
        }
        .cx-picker-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cx-picker-title { color: var(--text-primary); font-weight: 800; font-size: 16px; display: flex; align-items: center; gap: 8px; }
        .cx-picker-title i { color: var(--accent); }
        .cx-picker-close {
          background: var(--bg-elevated); border: none; color: var(--text-secondary);
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px; transition: all 0.2s;
        }
        .cx-picker-close:hover { background: var(--red); color: #fff; }
        .cx-picker-search {
          width: 100%; background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-primary); border-radius: 25px;
          padding: 10px 16px; font-size: 13px; font-family: var(--font-body);
          outline: none; margin-bottom: 10px;
        }
        .cx-picker-search:focus { border-color: var(--accent); }
        .cx-type-toggle { display: flex; gap: 8px; margin-bottom: 10px; }
        .cx-type-btn {
          padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: 700;
          font-family: var(--font-body); cursor: pointer; border: 1px solid;
          display: flex; align-items: center; gap: 6px; transition: all 0.15s;
        }
        .cx-type-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
        .cx-type-btn:not(.active) { background: var(--bg-elevated); border-color: var(--border); color: var(--text-secondary); }

        /* ── PiP ── */
        .cx-pip {
          position: fixed; bottom: 90px; right: 16px;
          width: 200px; height: 120px; border-radius: var(--radius);
          overflow: hidden; z-index: 800;
          border: 2px solid var(--accent);
          box-shadow: 0 8px 24px rgba(0,0,0,0.7);
        }
        .cx-pip-controls {
          position: absolute; top: 5px; right: 5px;
          display: flex; gap: 4px; z-index: 5;
        }
        .cx-pip-btn {
          background: rgba(0,0,0,0.75); border: none; color: #fff;
          padding: 4px 8px; border-radius: 8px; font-size: 9px;
          font-weight: 700; font-family: var(--font-body); cursor: pointer;
          display: flex; align-items: center; gap: 3px; transition: all 0.2s;
        }
        .cx-pip-btn.expand { background: rgba(79,142,247,0.85); }
        .cx-pip-live {
          position: absolute; bottom: 5px; left: 5px;
          background: rgba(34,197,94,0.85); color: #fff;
          padding: 2px 7px; border-radius: 8px; font-size: 8px; font-weight: 700;
          font-family: var(--font-body); display: flex; align-items: center; gap: 3px;
        }

        /* ── WiP minimized bar ── */
        .cx-minimized-bar {
          background: var(--bg-secondary); border-bottom: 1px solid var(--border);
          padding: 10px 16px; display: flex; align-items: center;
          justify-content: space-between; flex-shrink: 0;
        }
        .cx-minimized-info { display: flex; align-items: center; gap: 10px; }
        .cx-minimized-expand {
          background: var(--accent); border: none; color: #fff;
          padding: 7px 14px; border-radius: 20px; font-size: 11px;
          font-weight: 700; font-family: var(--font-body); cursor: pointer;
          display: flex; align-items: center; gap: 5px;
        }

        /* ── SYNC INPUT OVERLAY ── */
        .cx-sync-overlay {
          position: absolute; top: 10px; left: 10px; right: 90px; z-index: 20;
          background: rgba(8,14,23,0.97); border-radius: var(--radius-lg);
          padding: 14px; border: 1px solid var(--green);
        }
        .cx-sync-overlay-title { color: var(--green); font-weight: 700; font-size: 12px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .cx-sync-time-display {
          background: rgba(34,197,94,0.08); border-radius: var(--radius);
          padding: 10px; margin-bottom: 10px; border: 1px solid rgba(34,197,94,0.2);
        }
        .cx-sync-time-label { color: var(--text-muted); font-size: 9px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; }
        .cx-sync-time-val { color: var(--green); font-size: 22px; font-weight: 900; font-family: var(--font-display); letter-spacing: 2px; }
        .cx-sync-manual-row { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
        .cx-sync-manual-input {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-primary); border-radius: 8px;
          padding: 8px; width: 55px; text-align: center; font-size: 15px;
          font-weight: 700; font-family: var(--font-body); outline: none;
        }
        .cx-sync-manual-sep { color: var(--text-primary); font-size: 16px; font-weight: 700; }
        .cx-sync-actions { display: flex; gap: 8px; }
        .cx-sync-push-btn {
          flex: 1; background: var(--green); border: none; color: #fff;
          padding: 10px; border-radius: 20px; font-size: 12px; font-weight: 700;
          font-family: var(--font-body); cursor: pointer; display: flex;
          align-items: center; justify-content: center; gap: 5px;
        }
        .cx-sync-cancel-btn {
          background: var(--bg-elevated); border: 1px solid var(--border);
          color: var(--text-secondary); padding: 10px 14px;
          border-radius: 20px; font-size: 13px; font-family: var(--font-body); cursor: pointer;
        }

        /* ── Drift indicator ── */
        .cx-drift-badge {
          position: absolute; bottom: 10px; left: 10px;
          background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);
          border-radius: 10px; padding: 5px 10px; border: 1px solid rgba(34,197,94,0.3);
        }
        .cx-drift-text { color: var(--green); font-size: 10px; font-weight: 700; display: flex; align-items: center; gap: 4px; }

        /* ── Minimized video row in WT ── */
        .cx-wt-minimized-row {
          display: flex; align-items: center; gap: 10px;
        }

        /* ── AD slot ── */
        .cx-ad-slot {
          background: var(--bg-secondary); border: 1px dashed var(--border);
          border-radius: var(--radius); display: flex; align-items: center;
          justify-content: center; color: var(--text-muted);
          font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          font-family: var(--font-body); margin-bottom: 10px;
        }

        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes chatFadeIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .cx-fade-in { animation: fadeIn 0.3s ease; }
        .cx-chat-fade-in { animation: chatFadeIn 0.25s ease; }

        @media (max-width: 480px) {
          .cx-hero-rank { font-size: 60px; }
          .cx-hero-title { font-size: 24px; }
          .cx-modal-title { font-size: 24px; }
        }

        /* ── CATEGORY ROWS (Netflix-style) ── */
        .cx-row-section { padding: 0 0 8px; }
        .cx-row-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 16px 10px;
        }
        .cx-row-title {
          font-family: var(--font-body); font-size: 15px; font-weight: 800;
          color: var(--text-primary); letter-spacing: 0.2px;
        }
        .cx-row-see-all {
          color: var(--accent); font-size: 11px; font-weight: 600;
          background: none; border: none; cursor: pointer; font-family: var(--font-body);
          display: flex; align-items: center; gap: 4px; opacity: 0.8;
        }
        .cx-row-scroll {
          display: flex; gap: 8px; overflow-x: auto; padding: 0 16px 4px;
        }
        .cx-row-scroll::-webkit-scrollbar { display: none; }
        .cx-row-card {
          flex-shrink: 0; cursor: pointer; position: relative;
          border-radius: 8px; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cx-row-card:hover { transform: scale(1.04); box-shadow: 0 8px 24px rgba(0,0,0,0.7); }
        .cx-row-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.92) 100%);
          opacity: 0; transition: opacity 0.2s;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 8px;
        }
        .cx-row-card:hover .cx-row-card-overlay { opacity: 1; }
        .cx-row-card-title {
          color: #fff; font-size: 10px; font-weight: 700;
          text-align: center; margin-top: 5px; padding: 0 2px;
          font-family: var(--font-body); white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }

        /* ── COMING SOON ── */
        .cx-coming-section { padding: 0 16px 16px; }
        .cx-coming-date-label {
          font-family: var(--font-display); font-size: 22px; letter-spacing: 1px;
          color: var(--text-primary); margin: 20px 0 12px;
          display: flex; align-items: center; gap: 8px;
        }
        .cx-coming-date-label::after {
          content: ''; flex: 1; height: 1px; background: var(--border);
        }
        .cx-coming-card {
          background: var(--bg-card); border-radius: var(--radius-lg);
          border: 1px solid var(--border); overflow: hidden; margin-bottom: 12px;
          cursor: pointer; transition: border-color 0.2s;
        }
        .cx-coming-card:hover { border-color: var(--accent); }
        .cx-coming-card-inner { display: flex; gap: 0; }
        .cx-coming-info { padding: 14px; flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .cx-coming-title { color: var(--text-primary); font-weight: 800; font-size: 15px; line-height: 1.2; }
        .cx-coming-genres { display: flex; flex-wrap: wrap; gap: 5px; }
        .cx-coming-genre { background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-muted); padding: 3px 8px; border-radius: 5px; font-size: 10px; font-weight: 600; }
        .cx-coming-synopsis { color: var(--text-muted); font-size: 12px; line-height: 1.5; }
        .cx-coming-remind-btn {
          display: flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, var(--accent), var(--accent-dim));
          border: none; color: #fff; padding: 8px 16px; border-radius: 20px;
          font-size: 11px; font-weight: 700; font-family: var(--font-body);
          cursor: pointer; align-self: flex-start; margin-top: 4px;
          transition: all 0.2s; box-shadow: 0 2px 10px var(--accent-glow);
        }
        .cx-coming-remind-btn:hover { transform: translateY(-1px); }

        /* ── LEADERBOARD ── */
        .cx-lb-section { padding: 0 16px 16px; }
        .cx-lb-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .cx-lb-title { font-family: var(--font-display); font-size: 26px; letter-spacing: 1px; color: var(--text-primary); }
        .cx-lb-subtitle { color: var(--text-muted); font-size: 11px; line-height: 1.4; }
        .cx-lb-item {
          display: flex; align-items: center; gap: 12px;
          background: var(--bg-card); border-radius: var(--radius);
          border: 1px solid var(--border); padding: 10px 12px;
          margin-bottom: 8px; cursor: pointer; transition: all 0.2s;
        }
        .cx-lb-item:hover { border-color: var(--accent); background: var(--bg-elevated); }
        .cx-lb-rank {
          font-family: var(--font-display); font-size: 28px; letter-spacing: 1px;
          color: var(--text-muted); min-width: 32px; text-align: center; line-height: 1;
        }
        .cx-lb-rank.top3 { color: var(--gold); }
        .cx-lb-info { flex: 1; min-width: 0; }
        .cx-lb-name { color: var(--text-primary); font-weight: 700; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cx-lb-meta { color: var(--text-muted); font-size: 10px; margin-top: 2px; display: flex; align-items: center; gap: 6px; }
        .cx-lb-score { color: var(--red); font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 4px; white-space: nowrap; }

        /* ── TOP FILTER PANEL ── */
        .cx-side-layout { display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; }
        .cx-filter-side {
          width: 100%; flex-shrink: 0;
          background: var(--bg-secondary); border-bottom: 1px solid var(--border);
          overflow: hidden; padding: 0 14px;
          max-height: 0;
          transition: max-height 0.3s ease, padding 0.3s ease, opacity 0.25s ease;
          opacity: 0;
        }
        .cx-filter-side.open {
          max-height: 420px; overflow-y: auto; padding: 14px;
          opacity: 1;
        }
        .cx-filter-side-title {
          color: var(--text-primary); font-weight: 800; font-size: 14px;
          margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
        }
        .cx-filter-side-title i { color: var(--accent); }
        .cx-filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px 24px;
        }
        .cx-filter-col { display: flex; flex-direction: column; gap: 6px; }
        .cx-content-side { flex: 1; overflow-y: auto; min-width: 0; }

        /* ── HOME TABS (Coming Soon / Hot / Categories) ── */
        .cx-home-tabs { display: flex; gap: 4px; padding: 12px 16px 0; border-bottom: 1px solid var(--border); }
        .cx-home-tab {
          padding: 8px 16px; border-radius: 8px 8px 0 0; font-size: 13px; font-weight: 700;
          font-family: var(--font-body); cursor: pointer; border: none;
          color: var(--text-muted); background: none; transition: all 0.15s;
          display: flex; align-items: center; gap: 6px;
        }
        .cx-home-tab.active {
          color: var(--accent); background: var(--accent-glow);
          border-bottom: 2px solid var(--accent);
        }
        .cx-home-tab:hover:not(.active) { color: var(--text-primary); background: var(--bg-elevated); }
      `}</style>

      <div className="cx-header">
        <div className="cx-header-top">
          <span className="cx-logo">CINEMA<span>X</span></span>
          <div className="cx-search-wrap">
            <i className="fa fa-search" />
            <input
              className="cx-search"
              placeholder="Search movies, series..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="cx-nav">
          {[
            { label: 'Home', icon: 'fa-house' },
            { label: 'Trending', icon: 'fa-fire' },
            { label: 'Movies', icon: 'fa-film' },
            { label: 'Series', icon: 'fa-tv' },
          ].map(({ label, icon }) => (
            <button key={label}
              className={`cx-nav-btn ${activeTab === label && !watchTogetherVisible ? 'active' : ''}`}
              onClick={() => { setActiveTab(label); setSearch(''); setShowFilters(false); setGroupPage(1); setWatchTogetherVisible(false); }}
            >
              <i className={`fa ${icon}`} />{label}
            </button>
          ))}
          <button
            className={`cx-nav-btn ${watchTogetherVisible ? 'active' : ''} ${peerConnected ? 'live' : ''}`}
            onClick={() => setWatchTogetherVisible(true)}
          >
            <i className={`fa ${peerConnected ? 'fa-circle' : 'fa-users'}`} style={peerConnected ? { fontSize: 8 } : {}} />
            Watch Together
          </button>
          <button
            className={`cx-nav-btn ${filterPanelOpen ? 'active' : ''}`}
            onClick={() => setFilterPanelOpen(p => !p)}
          >
            <i className="fa fa-sliders" />
            Filter
            <i className={`fa fa-chevron-${filterPanelOpen ? 'up' : 'down'}`} style={{ fontSize: 10 }} />
          </button>
        </div>
      </div>
      {!watchTogetherVisible && (
        <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6px', minHeight: 36 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>SPONSORSHIP</span>
        </div>
      )}

      {/* ── HOME SUB-TABS ── */}
      {!watchTogetherVisible && activeTab === 'Home' && !search && (
        <div className="cx-home-tabs">
          {[
            { key: 'browse', icon: 'fa-th-large', label: 'Browse' },
            { key: 'coming', icon: 'fa-clock', label: 'Coming Soon' },
            { key: 'hot',    icon: 'fa-fire', label: 'Hot & Trending' },
          ].map(t => (
            <button key={t.key} className={`cx-home-tab ${homeSubTab === t.key ? 'active' : ''}`} onClick={() => setHomeSubTab(t.key as any)}>
              <i className={`fa ${t.icon}`} />{t.label}
            </button>
          ))}
        </div>
      )}

      {/* ── MAIN CONTENT: side-by-side filter + movies ── */}
      {!watchTogetherVisible && (
        <div className="cx-side-layout" style={{ flex: 1, minHeight: 0 }}>

          {/* FILTER TOP PANEL */}
          <div className={`cx-filter-side ${filterPanelOpen ? 'open' : ''}`}>
            <div className="cx-filter-grid">
              <div className="cx-filter-col">
                <div className="cx-filter-label"><i className="fa fa-calendar" />Year Range</div>
                <div className="cx-date-row">
                  <input className="cx-date-input" value={yearFrom} onChange={e => handleYearFromChange(e.target.value)} placeholder="From" maxLength={4} />
                  <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>→</span>
                  <input className="cx-date-input" value={yearTo} onChange={e => handleYearToChange(e.target.value)} placeholder="To" maxLength={4} />
                </div>
                <div className="cx-filter-label" style={{ marginTop: 8 }}><i className="fa fa-globe" />Region</div>
                <div className="cx-chip-row" style={{ flexWrap: 'wrap' }}>
                  {COUNTRIES.map(c => (
                    <button key={c.code} className={`cx-chip ${selectedCountry === c.code ? 'active' : ''}`}
                      style={{ marginBottom: 4 }}
                      onClick={() => setSelectedCountry(c.code)}>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="cx-filter-col">
                <div className="cx-filter-label"><i className="fa fa-calendar-days" />Month From</div>
                <div className="cx-chip-row" style={{ flexWrap: 'wrap' }}>
                  {MONTHS.map(m => (
                    <button key={`f-${m.val}`} className={`cx-chip ${monthFrom === m.val ? 'active' : ''}`}
                      style={{ marginBottom: 4 }}
                      onClick={() => { setMonthFrom(m.val); if (yearFrom === yearTo && parseInt(monthTo) < parseInt(m.val)) setMonthTo(m.val); }}>
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="cx-filter-col">
                <div className="cx-filter-label"><i className="fa fa-calendar-days" />Month To</div>
                <div className="cx-chip-row" style={{ flexWrap: 'wrap' }}>
                  {MONTHS.map(m => (
                    <button key={`t-${m.val}`} className={`cx-chip ${monthTo === m.val ? 'active' : ''}`}
                      style={{ marginBottom: 4 }}
                      onClick={() => { if (!(yearFrom === yearTo && parseInt(m.val) < parseInt(monthFrom))) setMonthTo(m.val); }}>
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="cx-filter-col">
                <div className="cx-filter-row-header" style={{ marginBottom: 6 }}>
                  <div className="cx-filter-label" style={{ margin: 0 }}><i className="fa fa-masks-theater" />Genres</div>
                  <input className="cx-genre-search" placeholder="Search..." value={genreSearch} onChange={e => setGenreSearch(e.target.value)} />
                </div>
                <div className="cx-chip-row" style={{ flexWrap: 'wrap' }}>
                  {filteredGenres.map(g => (
                    <button key={g.name} className={`cx-chip ${selectedGenre === g.id ? 'active' : ''}`}
                      style={{ marginBottom: 4 }}
                      onClick={() => setSelectedGenre(selectedGenre === g.id ? null : g.id)}>
                      {g.name}
                    </button>
                  ))}
                </div>
                <button className="cx-reset-btn" style={{ marginTop: 8 }} onClick={() => { setSelectedGenre(null); setSelectedCountry(''); setYearFrom('1990'); setYearTo(CURRENT_YEAR.toString()); setMonthFrom('01'); setMonthTo('12'); }}>
                  <i className="fa fa-rotate-left" /> Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div className="cx-content-side">
            <ScrollView style={{ flex: 1 }}>

              {/* ── HERO (Home tab only) ── */}
              {!search && activeTab === 'Home' && homeSubTab === 'browse' && heroMovies.length > 0 && (
                <div className="cx-hero" style={{ height: width < 480 ? 280 : 380 }}>
                  <div className="cx-hero-badge">
                    <div className="cx-hero-badge-dot" />
                    <span className="cx-hero-badge-text">TRENDING TODAY</span>
                  </div>
                  <ScrollView
                    ref={sliderRef}
                    horizontal pagingEnabled showsHorizontalScrollIndicator={false}
                    onScroll={handleOnScroll} scrollEventThrottle={16}
                    snapToAlignment="center" decelerationRate="fast"
                    contentContainerStyle={{ width: width * heroMovies.length }}
                  >
                    {heroMovies.map((m, i) => {
                      const w = width;
                      return (
                        <View key={i} style={{ width: w, height: width < 480 ? 280 : 380, overflow: 'hidden' }}>
                          <Image source={{ uri: m.banner }} style={{ width: '100%', height: '100%', opacity: 0.55, resizeMode: 'cover' }} />
                          <div className="cx-hero-overlay">
                            <div style={{ overflow: 'hidden' }}>
                              <span className="cx-hero-rank">{i + 1}</span>
                              <div style={{ display: 'inline-block', verticalAlign: 'bottom', maxWidth: 'calc(100% - 70px)' }}>
                                <div className="cx-hero-title" style={{ fontSize: width < 480 ? 22 : 32 }}>{m.title}</div>
                                <div className="cx-hero-meta">
                                  <i className="fa fa-calendar" style={{ marginRight: 4 }} />{m.releaseDate?.slice(0,4)}
                                  &nbsp;&nbsp;<i className="fa fa-star" style={{ color: 'var(--gold)', marginRight: 4 }} />{m.rating?.toFixed(1)}
                                </div>
                                <div className="cx-hero-synopsis" style={{ display: width < 480 ? 'none' : 'block' }}>{m.synopsis?.slice(0,120)}...</div>
                              </div>
                            </div>
                            <button className="cx-hero-play-btn" onClick={() => syncAndPlay(m)}>
                              <i className="fa fa-play" /> PLAY NOW
                            </button>
                          </div>
                        </View>
                      );
                    })}
                  </ScrollView>
                  <div className="cx-hero-dots">
                    {heroMovies.map((_, di) => (
                      <div key={di} className={`cx-dot ${heroIndex === di ? 'active' : ''}`} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── COMING SOON TAB ── */}
              {!search && activeTab === 'Home' && homeSubTab === 'coming' && (
                <div className="cx-coming-section">
                  <div style={{ color: 'var(--text-muted)', fontSize: 11, padding: '12px 0 4px', lineHeight: 1.5 }}>
                    <i className="fa fa-clock" style={{ color: 'var(--accent)', marginRight: 6 }} />
                    Upcoming releases in the next 30 days
                  </div>
                  {comingSoon.length === 0 ? (
                    <ActivityIndicator color="#4f8ef7" style={{ marginTop: 40 }} />
                  ) : comingSoon.map(({ date, items }) => (
                    <div key={date}>
                      <div className="cx-coming-date-label">{date}</div>
                      {items.map((m, i) => (
                        <div key={i} className="cx-coming-card" onClick={() => syncAndPlay(m)}>
                          {m.banner && <img src={m.banner} alt={m.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />}
                          <div className="cx-coming-card-inner">
                            <img src={m.poster} alt={m.title} style={{ width: 80, objectFit: 'cover', flexShrink: 0 }} />
                            <div className="cx-coming-info">
                              <div className="cx-coming-title">{m.title}</div>
                              <div className="cx-coming-genres">
                                {getGenreNames(m.genreIds).slice(0,3).map((g, gi) => (
                                  <span key={gi} className="cx-coming-genre">{g}</span>
                                ))}
                              </div>
                              <p className="cx-coming-synopsis">{m.synopsis?.slice(0, 100)}...</p>
                              <button className="cx-coming-remind-btn" onClick={e => { e.stopPropagation(); }}>
                                <i className="fa fa-bell" /> Remind Me
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* ── HOT & TRENDING / LEADERBOARD TAB ── */}
              {!search && activeTab === 'Home' && homeSubTab === 'hot' && (
                <div className="cx-lb-section">
                  <div className="cx-lb-header">
                    <div>
                      <div className="cx-lb-title"><i className="fa fa-fire" style={{ color: '#ef4444', fontSize: 22, marginRight: 8 }} />HOT</div>
                      <div className="cx-lb-subtitle">Ranked by popularity · updated daily</div>
                    </div>
                  </div>
                  {leaderboard.length === 0 ? (
                    <ActivityIndicator color="#4f8ef7" style={{ marginTop: 40 }} />
                  ) : leaderboard.map((m) => (
                    <div key={m.id} className="cx-lb-item" onClick={() => syncAndPlay(m)}>
                      <div className={`cx-lb-rank ${m.rank <= 3 ? 'top3' : ''}`}>{m.rank}</div>
                      <img src={m.poster} alt={m.title} style={{ width: 46, height: 68, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
                      <div className="cx-lb-info">
                        <div className="cx-lb-name">{m.title}</div>
                        <div className="cx-lb-meta">
                          <i className="fa fa-star" style={{ color: 'var(--gold)' }} />{m.rating?.toFixed(1)}
                          <span>·</span>{m.releaseDate?.slice(0,4)}
                          <span>·</span>{getGenreNames(m.genreIds).slice(0,2).join(', ')}
                        </div>
                      </div>
                      <div className="cx-lb-score">
                        <i className="fa fa-fire" style={{ color: '#ef4444', fontSize: 11 }} /> {m.score.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── BROWSE: Category Rows + regular grid ── */}
              {(search || activeTab !== 'Home' || homeSubTab === 'browse') && (
                <>
                  {/* Category rows — only on Home Browse with no search */}
                  {!search && activeTab === 'Home' && homeSubTab === 'browse' && (
                    <>
                      {rowsLoading ? (
                        <ActivityIndicator color="#4f8ef7" style={{ marginTop: 30, marginBottom: 10 }} />
                      ) : categoryRows.map((row, ri) => (
                        <div key={ri} className="cx-row-section">
                          <div className="cx-row-header">
                            <span className="cx-row-title">
                              {row.icon && <i className={`fa ${row.icon}`} style={{ color: row.iconColor || 'var(--accent)', marginRight: 7, fontSize: 13 }} />}
                              {row.title}
                            </span>
                            <button className="cx-row-see-all"><i className="fa fa-chevron-right" /> See All</button>
                          </div>
                          <div className="cx-row-scroll">
                            {row.items.map((item, ii) => {
                              const cardW = width < 500 ? 100 : 120;
                              return (
                                <div key={ii} className="cx-row-card" style={{ width: cardW }} onClick={() => syncAndPlay(item)}>
                                  <Image source={{ uri: item.poster }} style={{ width: cardW, height: cardW * 1.48, display: 'block' }} />
                                  <div className="cx-row-card-overlay">
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                                      <div className="cx-card-play"><i className="fa fa-play" /></div>
                                    </div>
                                  </div>
                                  <div className="cx-rating-badge" style={{ top: 4, right: 4 }}>
                                    <i className="fa fa-star" />{item.rating?.toFixed(1)}
                                  </div>
                                  <div className="cx-row-card-title">{item.title}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Regular movie grid (all tabs when searching, or Movies/Series/Trending) */}
                  {(search || activeTab !== 'Home') && (
                    <div className="cx-section">
                      {loading ? (
                        <ActivityIndicator color="#4f8ef7" style={{ marginTop: 50 }} />
                      ) : (
                        <>
                          <div className="cx-grid">
                            {movies.map((item, index) => {
                              const cardW = width < 400 ? (width - 60) / 3 : width < 600 ? (width - 70) / 3 : width < 900 ? (width - 80) / 4 : width < 1200 ? (width - 100) / 5 : (width - 120) / 6;
                              const posterH = cardW * 1.48;
                              return (
                                <React.Fragment key={`${item.id}-${index}`}>
                                  {index > 0 && index % 6 === 0 && (
                                    <div className="cx-ad-slot" style={{ width: cardW, height: posterH }}>AD</div>
                                  )}
                                  <div className="cx-card" style={{ width: cardW }} onClick={() => syncAndPlay(item)}>
                                    <Image source={{ uri: item.poster }} style={{ width: cardW, height: posterH, borderRadius: 10 }} />
                                    <div className="cx-card-overlay">
                                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div className="cx-card-play"><i className="fa fa-play" /></div>
                                      </div>
                                    </div>
                                    <div className="cx-rating-badge">
                                      <i className="fa fa-star" />{item.rating?.toFixed(1)}
                                    </div>
                                    <div className="cx-card-title">{item.title}</div>
                                  </div>
                                </React.Fragment>
                              );
                            })}
                          </div>
                          {movies.length > 0 && (
                            <div className="cx-pagination">
                              <button className="cx-page-btn" disabled={groupPage === 1} onClick={() => setGroupPage(p => Math.max(1, p - 1))}>
                                <i className="fa fa-chevron-left" /> PREV
                              </button>
                              <div className="cx-page-info">
                                <span>1 ···</span>
                                <input className="cx-page-input" value={pageInput} onChange={e => setPageInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && jumpToPage()} />
                                <span>··· {totalPages}</span>
                              </div>
                              <button className="cx-page-btn" disabled={!hasMore || groupPage >= totalPages} onClick={() => setGroupPage(p => Math.min(totalPages, p + 1))}>
                                NEXT <i className="fa fa-chevron-right" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </>
              )}

            </ScrollView>
          </div>
        </div>
      )}

      {selectedMovie && !watchTogetherVisible && (
        <div className="cx-modal-overlay cx-fade-in">
          <div className="cx-modal" style={loadVideo ? { width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', borderRadius: 0 } : {}}>
            <button className="cx-modal-close" onClick={() => { setSelectedMovie(null); setLoadVideo(false); localStorage.removeItem('selectedMovie'); localStorage.removeItem('loadVideo'); }}>
              <i className="fa fa-xmark" />
            </button>
            {!loadVideo ? (
              <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                <img src={selectedMovie.banner || selectedMovie.poster} className="cx-modal-banner" alt={selectedMovie.title} />
                <div className="cx-modal-body">
                  <div className="cx-modal-title">{selectedMovie.title}</div>
                  <div className="cx-modal-meta">
                    <span className="cx-modal-date"><i className="fa fa-calendar-days" /> {selectedMovie.releaseDate}</span>
                    <span className="cx-modal-rating"><i className="fa fa-star" /> {selectedMovie.rating?.toFixed(1)}</span>
                  </div>
                  <div className="cx-genre-tags">
                    {getGenreNames(selectedMovie.genreIds).map((gName, idx) => (
                      <span key={idx} className="cx-genre-tag">{gName}</span>
                    ))}
                  </div>
                  <p className="cx-synopsis">{selectedMovie.synopsis}</p>
                  <div className="cx-server-badge">
                    <i className="fa fa-server" style={{ color: 'var(--accent)', fontSize: 12 }} />
                    <span className="cx-server-badge-text">Streaming via</span>
                    <span className="cx-server-badge-val">{SERVERS[selectedServer]?.name}</span>
                  </div>
                  <button className="cx-watch-btn" onClick={() => setLoadVideo(true)}>
                    <i className="fa fa-play" /> PLAY NOW
                  </button>
                </div>
              </ScrollView>
            ) : (
              <View style={{ flex: 1, backgroundColor: '#000' }}>
                {imdbLoading ? (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                    <ActivityIndicator color="#4f8ef7" size="large" />
                    <Text style={{ color: '#8a9bb5', fontSize: 12, marginTop: 12, fontFamily: 'Outfit, sans-serif' }}>Fetching source...</Text>
                  </View>
                ) : SERVERS[selectedServer].needsImdb && !imdbId ? (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', padding: 20 }}>
                    <Text style={{ color: '#ef4444', fontSize: 14, textAlign: 'center' }}>IMDB ID not found for this title. Try another server.</Text>
                  </View>
                ) : (
                  <iframe
                    key={`player-${selectedMovie.tmdbId}-${selectedServer}`}
                    src={SERVER_URL(selectedMovie.type, selectedMovie.tmdbId, 0, selectedServer, imdbId || undefined)}
                    style={{ width: '100%', height: '100%', border: 'none', WebkitOverflowScrolling: 'touch' } as any}
                    allowFullScreen
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share; xr-spatial-tracking"
                    referrerPolicy="no-referrer-when-downgrade"
                    
                  />
                )}
                <div className="cx-player-bar">
                  <div className="cx-server-label"><i className="fa fa-satellite-dish" /> Switch Server if video won't play</div>
                  <div className="cx-server-row">
                    {SERVERS.map((server, index) => (
                      <button key={index} className={`cx-server-btn ${selectedServer === index ? 'active' : ''}`} onClick={() => setSelectedServer(index)}>
                        {selectedServer === index && <i className="fa fa-circle-play" />}
                        {server.name}{server.needsImdb ? ' ✦' : ''}
                      </button>
                    ))}
                  </div>
                  <div className="cx-promo-row">
                    <span className="cx-promo-text">Enjoying CinemaX? Share with friends!</span>
                    <button className={`cx-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopyLink}>
                      <i className={`fa ${copied ? 'fa-check' : 'fa-link'}`} />
                      {copied ? (roomId ? 'ID Copied!' : 'Copied!') : (roomId ? 'Copy Room ID' : 'Copy Link')}
                    </button>
                  </div>
                </div>
              </View>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          WATCH TOGETHER — FULL SCREEN PAGE
      ══════════════════════════════════════════════════ */}
      {watchTogetherVisible && (
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#080e17', zIndex: 500, flexDirection: 'column' }} onTouchStart={resetInactivityTimer}>

          {/* ── TOP BAR ── */}
          <div className="cx-wt-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="cx-wt-back" onClick={() => { setWatchTogetherVisible(false); if (wtVideoLoaded && wtMovie) setWtPip(true); }}>
                <i className="fa fa-arrow-left" />
              </button>
              <div>
                <div className="cx-wt-title"><i className="fa fa-users" style={{ color: 'var(--accent)', marginRight: 6 }} />Watch Together</div>
                <div className={`cx-wt-status-text`} style={{ color: peerConnected ? 'var(--green)' : 'var(--text-muted)' }}>
                  {peerConnected ? '● Connected & Live' : peer ? '● Ready to connect' : '● Initializing...'}
                </div>
              </div>
            </div>
            {peerConnected && (
              <button className="cx-leave-btn" onClick={leaveRoom}>
                <i className="fa fa-right-from-bracket" /> Leave Room
              </button>
            )}
          </div>

          {/* ── STATUS BANNER ── */}
          {!!wtStatus && (
            <div className="cx-status-banner" style={{
              background: peerConnected ? 'rgba(34,197,94,0.08)' : 'var(--bg-secondary)',
              borderColor: peerConnected ? 'rgba(34,197,94,0.25)' : 'var(--border)'
            }}>
              <i className={`fa ${peerConnected ? 'fa-circle-check' : 'fa-circle-info'}`} style={{ color: peerConnected ? 'var(--green)' : 'var(--text-muted)', fontSize: 12 }} />
              <span style={{ color: peerConnected ? 'var(--green)' : 'var(--text-secondary)', fontSize: 12, flex: 1 }}>{wtStatus}</span>
            </div>
          )}

          {/* ── MAIN CONTENT AREA ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: width > 768 ? 'row' : 'column', overflow: 'hidden', minHeight: 0 }}>

            {/* LEFT / TOP: VIDEO PANEL */}
            <div style={{
              flex: wtVideoMinimized ? '0 0 0px' : (width > 768 ? '0 0 55%' : '0 0 45%'),
              backgroundColor: '#000',
              minHeight: wtVideoMinimized ? 0 : (width > 768 ? '100%' : 220),
              position: 'relative',
              overflow: 'hidden',
            } as any}>
              {/* Video / Placeholder */}
              {!wtMovie ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, padding: 24, height: '100%' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fa fa-film" style={{ color: 'var(--accent)', fontSize: 28 }} />
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
                    {hostMode || !peerConnected ? 'No movie selected.\nPick one to start the session.' : 'Waiting for host to pick a movie...'}
                  </p>
                  {hostMode && (
                    <button className="cx-create-btn" style={{ padding: '12px 24px', borderRadius: 25, width: 'auto' }} onClick={() => setWtShowMoviePicker(true)}>
                      <i className="fa fa-film" /> Browse & Pick Movie
                    </button>
                  )}
                </div>
              ) : wtVideoLoaded ? (
                <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
                  <style>{`
                    @keyframes fadeOutOverlay { 0%{opacity:1} 70%{opacity:1} 100%{opacity:0;pointer-events:none} }
                    .wt-autoplay-overlay { animation: fadeOutOverlay 1s forwards; background:transparent; position:absolute; inset:0; z-index:5; cursor:pointer; }
                  `}</style>
                  <iframe
                    key={`wt-iframe-${wtMovie?.tmdbId}-${wtIframeKey}`}
                    src={SERVER_URL(wtMovie.type, wtMovie.tmdbId, Math.max(0, wtLoadedOffset), selectedServer, imdbId || undefined)}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block', WebkitOverflowScrolling: 'touch' } as any}
                    allowFullScreen
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share; xr-spatial-tracking"
                    referrerPolicy="no-referrer-when-downgrade"
                    
                    onLoad={(e: any) => {
                      try { e.target.contentWindow?.postMessage({ type: 'play' }, '*'); } catch(_) {}
                    }}
                  />
                  <div className="wt-autoplay-overlay" onClick={() => {}} />
                  {/* Minimize button */}
                  <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                    <button className="cx-pip-btn" onClick={() => setWtVideoMinimized(true)}>
                      <i className="fa fa-compress" /> Min
                    </button>
                  </div>

                  {/* Host Sync Input Panel */}
                  {hostMode && wtShowSyncInput && (
                    <div className="cx-sync-overlay">
                      <div className="cx-sync-overlay-title"><i className="fa fa-satellite-dish" />Push Sync to Guest</div>
                      {hostDisplayTime > 0 ? (
                        <div className="cx-sync-time-display">
                          <div className="cx-sync-time-label">Real video time</div>
                          <div className="cx-sync-time-val">{fmtHMS(hostDisplayTime)}</div>
                        </div>
                      ) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: 10, marginBottom: 10 }}>Waiting for player... (play video first)</p>
                      )}
                      <p style={{ color: 'var(--text-muted)', fontSize: 10, marginBottom: 6 }}>Or override manually:</p>
                      <div className="cx-sync-manual-row">
                        <input className="cx-sync-manual-input" value={wtSyncMinutes} onChange={e => setWtSyncMinutes(e.target.value)} placeholder="0" maxLength={3} />
                        <span className="cx-sync-manual-sep">m</span>
                        <input className="cx-sync-manual-input" value={wtSyncSeconds} onChange={e => setWtSyncSeconds(e.target.value)} placeholder="0" maxLength={2} />
                        <span className="cx-sync-manual-sep">s</span>
                      </div>
                      <div className="cx-sync-actions">
                        <button className="cx-sync-push-btn" onClick={wtHostSeekSync}>
                          <i className="fa fa-satellite-dish" /> Push to Guest
                        </button>
                        <button className="cx-sync-cancel-btn" onClick={() => setWtShowSyncInput(false)}>
                          <i className="fa fa-xmark" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Guest drift indicator */}
                  {!hostMode && wtDriftSeconds !== null && (
                    <div className="cx-drift-badge">
                      <div className="cx-drift-text"><i className="fa fa-clock" /> Host at {fmtHMS(wtDriftSeconds)}</div>
                    </div>
                  )}
                </div>
              ) : (
                /* Movie info card — pre-play state */
                <div style={{ display: 'flex', flexDirection: 'row', background: 'var(--bg-primary)', height: '100%' }}>
                  <img src={wtMovie.poster} alt={wtMovie.title} style={{ width: 110, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12, overflow: 'hidden' }}>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: 15, marginBottom: 4, lineHeight: 1.2 }}>{wtMovie.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="fa fa-star" style={{ color: 'var(--gold)' }} />{wtMovie.rating?.toFixed(1)}
                        <span>·</span>
                        <i className="fa fa-calendar" />{wtMovie.releaseDate?.slice(0,4)}
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' } as any}>{wtMovie.synopsis}</p>
                    </div>
                    {hostMode ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button className="cx-create-btn" onClick={wtHostPlay}>
                          <i className="fa fa-play" /> Play & Sync to Friend
                        </button>
                        <button className="cx-change-btn" style={{ justifyContent: 'center', padding: '10px 16px', borderRadius: 20 }} onClick={() => setWtShowMoviePicker(true)}>
                          <i className="fa fa-rotate" /> Change Movie
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button className="cx-join-btn" onClick={wtGuestSync}>
                          <i className="fa fa-link" /> Sync & Play
                        </button>
                        {wtDriftSeconds !== null && (
                          <div style={{ color: 'var(--gold)', fontSize: 11, textAlign: 'center', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                            <i className="fa fa-clock" /> Host is at ~{fmtHMS(wtDriftSeconds)}
                          </div>
                        )}
                        <p style={{ color: 'var(--text-muted)', fontSize: 10, textAlign: 'center', margin: 0 }}>
                          {guestStartTsRef.current ? 'Tap to jump to host\'s current position.' : 'Waiting for host to start playback...'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Minimized video pill */}
            {wtVideoMinimized && wtMovie && wtVideoLoaded && (
              <div className="cx-minimized-bar">
                <div className="cx-minimized-info">
                  <Image source={{ uri: wtMovie.poster }} style={{ width: 30, height: 44, borderRadius: 4 }} />
                  <div>
                    <Text style={{ color: '#f0f4ff', fontWeight: '700', fontSize: 12 }} numberOfLines={1}>{wtMovie.title}</Text>
                    <Text style={{ color: '#4f8ef7', fontSize: 10 }}><i className="fa fa-play" /> Playing</Text>
                  </div>
                </div>
                <button className="cx-minimized-expand" onClick={() => setWtVideoMinimized(false)}>
                  <i className="fa fa-chevron-up" /> Expand
                </button>
              </div>
            )}

            {/* RIGHT / BOTTOM: SIDEBAR */}
            <div style={{ flex: 1, background: 'var(--bg-primary)', borderLeft: width > 768 ? '1px solid var(--border)' : 'none', borderTop: width <= 768 ? '1px solid var(--border)' : 'none', display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

              {/* ── NOT CONNECTED: Room setup ── */}
              {!peerConnected ? (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 12 }}>

                  {/* CREATE ROOM */}
                  <div className="cx-room-card">
                    <div className="cx-room-card-title"><i className="fa fa-house" />Host a Room</div>
                    <p className="cx-room-card-desc">Create a room and share your Room ID with a friend to watch together in sync.</p>
                    {!roomId ? (
                      <button className="cx-create-btn" disabled={!peer} onClick={createRoom}>
                        {peer ? <><i className="fa fa-wand-magic-sparkles" /> Create Room</> : <><i className="fa fa-spinner fa-spin" /> Connecting...</>}
                      </button>
                    ) : (
                      <>
                        <div className="cx-room-id-box">
                          <div className="cx-room-id-label">Your Room ID</div>
                          <div className="cx-room-id-val">{roomId}</div>
                        </div>
                        <div className="cx-room-actions">
                          <button className={`cx-copy-room-btn ${copied ? 'copied' : ''}`} onClick={() => { navigator.clipboard.writeText(roomId); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                            <i className={`fa ${copied ? 'fa-check' : 'fa-copy'}`} />{copied ? 'Copied!' : 'Copy Room ID'}
                          </button>
                          <button className="cx-cancel-btn" onClick={createRoom}>Cancel</button>
                        </div>
                        <div className="cx-waiting-row">
                          <div className="cx-waiting-dot" />
                          <Text style={{ color: '#f59e0b', fontSize: 11 }}>Waiting for friend to join...</Text>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="cx-divider">
                    <div className="cx-divider-line" /><span className="cx-divider-text">OR</span><div className="cx-divider-line" />
                  </div>

                  {/* JOIN ROOM */}
                  <div className="cx-room-card">
                    <div className="cx-room-card-title"><i className="fa fa-link" />Join a Room</div>
                    <p className="cx-room-card-desc">Enter your friend's Room ID to sync and watch together.</p>
                    <input
                      className="cx-join-input"
                      value={joinCode}
                      onChange={e => setJoinCode(e.target.value)}
                      placeholder="Paste Room ID here..."
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                    <button className="cx-join-btn" disabled={!peer || !joinCode.trim()} onClick={joinRoom}>
                      <i className="fa fa-rocket" /> Join Room
                    </button>
                  </div>

                  {/* HOW IT WORKS */}
                  <div className="cx-howto-card">
                    <div className="cx-howto-title"><i className="fa fa-circle-info" />How it works</div>
                    {[
                      ['1', 'One person taps Create Room and shares their Room ID.'],
                      ['2', 'The other person pastes it and taps Join Room.'],
                      ['3', 'The host picks a movie and taps Play & Sync.'],
                      ['4', 'Guest taps Sync & Watch — you\'re watching in sync!'],
                    ].map(([num, text]) => (
                      <div key={num} className="cx-howto-step">
                        <div className="cx-howto-num">{num}</div>
                        <p className="cx-howto-text">{text}</p>
                      </div>
                    ))}
                  </div>
                </ScrollView>

              ) : (
                /* ── CONNECTED: chat + controls ── */
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  {/* Room info strip */}
                  <div className="cx-connected-strip">
                    <div>
                      <div className="cx-connected-role">
                        <i className={`fa ${hostMode ? 'fa-crown' : 'fa-ticket'}`} />
                        {hostMode ? 'You are the Host' : 'You are a Guest'}
                      </div>
                      <div className="cx-connected-sub">
                        {hostMode
                          ? (hostDisplayTime > 0 ? `${fmtHMS(hostDisplayTime)} · Room: ${roomId.slice(0,8)}...` : `Room: ${roomId.slice(0,8)}...`)
                          : `Host: ${joinCode.slice(0,8)}...`}
                      </div>
                    </div>
                    {hostMode && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        {wtVideoLoaded && (
                          <button className="cx-sync-btn" onClick={() => setWtShowSyncInput(s => !s)}>
                            <i className="fa fa-satellite-dish" /> Sync
                          </button>
                        )}
                        <button className="cx-change-btn" onClick={() => setWtShowMoviePicker(true)}>
                          <i className="fa fa-film" /> Change
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Chat area */}
                  <ScrollView
                    ref={wtChatScrollRef}
                    style={{ flex: 1, backgroundColor: '#080e17' }}
                    contentContainerStyle={{ padding: 12, paddingBottom: 8 }}
                    onContentSizeChange={() => wtChatScrollRef.current?.scrollToEnd({ animated: true })}
                  >
                    {wtChatMessages.length === 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 40, gap: 10 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fa fa-comments" style={{ color: 'var(--text-muted)', fontSize: 20 }} />
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', margin: 0, lineHeight: 1.5 }}>No messages yet.{'\n'}Say hi to your watch party!</p>
                      </div>
                    ) : wtChatMessages.map((msg, i) => (
                      <div key={i} className={`cx-chat-msg ${msg.from === 'me' ? 'me' : 'friend'}`}>
                        <span className="cx-chat-time">{msg.from === 'me' ? 'You' : 'Friend'} · {msg.time}</span>
                        <div className={`cx-chat-bubble ${msg.from === 'me' ? 'me' : 'friend'}`}>{msg.text}</div>
                      </div>
                    ))}
                  </ScrollView>

                  {/* Chat input */}
                  <div className="cx-chat-input-row">
                    <input
                      className="cx-chat-input"
                      value={wtChatInput}
                      onChange={e => setWtChatInput(e.target.value)}
                      placeholder="Say something..."
                      onKeyDown={e => e.key === 'Enter' && sendWtChat()}
                    />
                    <button className="cx-send-btn" onClick={sendWtChat}>
                      <i className="fa fa-paper-plane" />
                    </button>
                  </div>
                </View>
              )}
            </div>
          </div>

          {/* ── MOVIE PICKER OVERLAY (Host Only) ── */}
          {wtShowMoviePicker && (
            <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#080e17', zIndex: 100, flexDirection: 'column' }}>
              <div className="cx-picker-header">
                <div className="cx-picker-top">
                  <div className="cx-picker-title"><i className="fa fa-film" />Pick a Movie</div>
                  <button className="cx-picker-close" onClick={() => setWtShowMoviePicker(false)}>
                    <i className="fa fa-xmark" />
                  </button>
                </div>
                <input
                  className="cx-picker-search"
                  value={wtPickerSearch}
                  onChange={e => { setWtPickerSearch(e.target.value); setWtPickerPage(1); }}
                  placeholder="Search movies & series..."
                />
                <div className="cx-type-toggle">
                  {((['movie', 'tv']) as Array<'movie' | 'tv'>).map(t => (
                    <button key={t} className={`cx-type-btn ${wtPickerType === t ? 'active' : ''}`}
                      onClick={() => { setWtPickerType(t); setWtPickerPage(1); }}>
                      <i className={`fa ${t === 'movie' ? 'fa-film' : 'fa-tv'}`} />
                      {t === 'movie' ? 'Movies' : 'Series'}
                    </button>
                  ))}
                </div>
                <div className="cx-chip-row">
                  {GENRES.slice(0, 10).map(g => (
                    <button key={g.name} className={`cx-chip ${wtPickerGenre === g.id ? 'active' : ''}`}
                      onClick={() => { setWtPickerGenre(g.id); setWtPickerPage(1); }}>
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>
              <ScrollView
                contentContainerStyle={{ padding: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' } as any}
                onScroll={({ nativeEvent }) => {
                  const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 200 && !wtPickerLoading && wtPickerHasMore) fetchWtPickerMovies(false);
                }}
                scrollEventThrottle={400}
              >
                {wtPickerMovies.map((item, idx) => {
                  const cardW = width < 400 ? (width - 60) / 3 : width < 600 ? (width - 70) / 3 : 105;
                  return (
                    <div key={idx} className="cx-card" style={{ width: cardW }} onClick={() => wtPickMovie(item)}>
                      <Image source={{ uri: item.poster }} style={{ width: cardW, height: cardW * 1.48, borderRadius: 10, borderWidth: wtMovie?.tmdbId === item.tmdbId ? 2 : 0, borderColor: '#4f8ef7' } as any} />
                      <div className="cx-card-overlay">
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                          <div className="cx-card-play"><i className="fa fa-play" /></div>
                        </div>
                      </div>
                      <div className="cx-card-title">{item.title}</div>
                    </div>
                  );
                })}
                {wtPickerLoading && <ActivityIndicator color="#4f8ef7" style={{ marginVertical: 20, width: '100%' as any }} />}
                {!wtPickerLoading && wtPickerHasMore && wtPickerMovies.length > 0 && (
                  <button onClick={() => fetchWtPickerMovies(false)} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--accent)', padding: '10px 24px', borderRadius: 20, fontFamily: 'var(--font-body)', fontWeight: 700, cursor: 'pointer', margin: '10px auto' }}>
                    Load More
                  </button>
                )}
              </ScrollView>
            </View>
          )}

        </View>
      )}

      {/* ══ WATCH TOGETHER PiP ══ */}
      {wtPip && wtMovie && wtVideoLoaded && !watchTogetherVisible && (
        <div className="cx-pip">
          <iframe
            key={`pip-${wtMovie.tmdbId}`}
            src={SERVER_URL(wtMovie.type, wtMovie.tmdbId)}
            style={{ width: '100%', height: '100%', border: 'none', WebkitOverflowScrolling: 'touch' } as any}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share; xr-spatial-tracking"
            referrerPolicy="no-referrer-when-downgrade"/>
          <div className="cx-pip-controls">
            <button className="cx-pip-btn expand" onClick={() => { setWatchTogetherVisible(true); setWtPip(false); }}>
              <i className="fa fa-expand" /> Expand
            </button>
            <button className="cx-pip-btn" onClick={() => { setWtPip(false); setWtVideoLoaded(false); }}>
              <i className="fa fa-xmark" />
            </button>
          </div>
          <div className="cx-pip-live"><i className="fa fa-circle" style={{ fontSize: 6 }} /> LIVE</div>
        </div>
      )}

      {/* ══ AI CHATBOT ══ */}
      <style>{`
        @keyframes slideInRight { from { transform: translateX(52px); } to { transform: translateX(0); } }
        @keyframes slideOutRight { from { transform: translateX(0); } to { transform: translateX(52px); } }
      `}</style>

      {chatMode === 'hidden' && (
        <div className="cx-ai-peek" onClick={handleFabClick}>
          <i className="fa fa-robot" />
        </div>
      )}

      {chatMode === 'fab' && (
        <div className="cx-ai-fab" onClick={handleFabClick}>
          <i className="fa fa-robot" />
          <div className="cx-ai-online-dot" />
        </div>
      )}

      {chatMode === 'open' && (
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#080e17', zIndex: 1000, flexDirection: 'column' }}>
          <div className="cx-ai-header">
            <div className="cx-ai-header-left">
              <button className="cx-wt-back" onClick={closeChatToFab}>
                <i className="fa fa-arrow-left" />
              </button>
              <div className="cx-ai-icon"><i className="fa fa-robot" /></div>
              <div>
                <div className="cx-ai-name">CinemaX <span>AI</span></div>
                <div className="cx-ai-online"><i className="fa fa-circle" style={{ fontSize: 7 }} />Online · Ready to help</div>
              </div>
            </div>
            <button className="cx-ai-clear" onClick={clearChat}>CLEAR</button>
          </div>

          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1, backgroundColor: '#080e17' }}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`cx-ai-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
                <div className={`cx-ai-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}>
                  {msg.role === 'user' ? (
                    <Text style={{ color: '#fff', fontSize: 13, lineHeight: 20 }}>{msg.content}</Text>
                  ) : (
                    <Markdown style={markdownStyles}>{msg.content}</Markdown>
                  )}
                </div>
                <div className="cx-ai-time">{msg.role === 'user' ? 'You' : 'CinemaX AI'} · {msg.timestamp || 'Just now'}</div>
              </div>
            ))}
            {isTyping && (
              <div className="cx-ai-msg bot">
                <div className="cx-ai-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ActivityIndicator size="small" color="#4f8ef7" />
                  <Text style={{ color: '#8a9bb5', fontSize: 12 }}>CinemaX is thinking...</Text>
                </div>
              </div>
            )}
          </ScrollView>

          <div className="cx-quick-row">
            {['🔥 Trending', '🍿 Horror', '🎬 Top 10', '🎭 Drama', '🌏 K-Drama', '🎌 Anime'].map((s, i) => (
              <button key={i} className="cx-quick-chip" onClick={() => setChatInput(s)}>{s}</button>
            ))}
          </div>

          <div className="cx-ai-input-row">
            <input
              className="cx-ai-input"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ask for a movie recommendation..."
              onKeyDown={e => e.key === 'Enter' && askAI()}
            />
            <button className="cx-ai-send" onClick={askAI}>
              <i className="fa fa-paper-plane" />
            </button>
          </div>
        </View>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const markdownStyles = StyleSheet.create({
  body: { color: '#f0f4ff', fontSize: 13, lineHeight: 20 },
  strong: { fontWeight: 'bold', color: '#4f8ef7' },
  bullet_list: { marginVertical: 8 },
  list_item: { color: '#f0f4ff', fontSize: 13 },
});
