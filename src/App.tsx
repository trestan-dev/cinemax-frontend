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
    getUrl: (type: string, id: any, startAt: number = 0) => {
      const base = `https://vidsrc.cc/v2/embed/${type === 'tv' ? 'tv' : 'movie'}/${id}`;
      const params = ['autoPlay=1'];
      if (startAt > 3) params.push(`startAt=${Math.floor(startAt)}`);
      return `${base}?${params.join('&')}`;
    }
  },
  {
    name: "VidLink",
    getUrl: (type: string, id: any, startAt: number = 0) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://vidlink.pro/${t}/${id}`;
    }
  },
  {
    name: "VidSrc RIP",
    getUrl: (type: string, id: any, startAt: number = 0) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://vidsrc.rip/embed/${t}/${id}`;
    }
  },
  {
    name: "2Embed",
    getUrl: (type: string, id: any, startAt: number = 0) => {
      return `https://www.2embed.cc/embed/${id}`;
    }
  },
  {
    name: "SmashyStream",
    getUrl: (type: string, id: any, startAt: number = 0) => {
      const t = type === 'tv' ? 'tv' : 'movie';
      return `https://embed.smashystream.com/playere.php?tmdb=${id}&type=${t}`;
    }
  },
  {
    name: "NontonGo",
    getUrl: (type: string, id: any, startAt: number = 0) => {
      const t = type === 'tv' ? 'serie' : 'film';
      return `https://www.nontongo.win/embed/${t}/${id}`;
    }
  },
];

const SERVER_URL = (type: string, id: any, startAtSeconds: number = 0, serverIndex: number = 0) => {
  const idx = Math.min(serverIndex, SERVERS.length - 1);
  return SERVERS[idx].getUrl(type, id, startAtSeconds);
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
    content: 'Hi! I’m CinemaX AI. Looking for a specific vibe or movie recommendation?',
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
        content: 'Hi! I’m CinemaX AI. Looking for a specific vibe or movie recommendation?',
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
    <View style={styles.container}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; overflow-x: hidden; width: 100%; max-width: 100vw; background: #0b1622; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        .blink-dot { animation: blink 1.5s infinite; }
        .ad-container { background: #0b1622; display: flex; justify-content: center; align-items: center; overflow: hidden; }
      `}</style>

      <View style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
          <Text style={[styles.logo, {flexShrink: 0}]}>CINEMA<Text style={{color: '#5e96f1'}}>X</Text></Text>
          <TextInput style={[styles.searchBar, {flex: 1, minWidth: 0}]} placeholder="Search..." placeholderTextColor="#64748b" value={search} onChangeText={setSearch} />
        </div>
        
        

        <View style={styles.navRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navScroll}>
            {["Home", "Trending", "Movies", "Series"].map(l => (
              <TouchableOpacity key={l} onPress={() => {setActiveTab(l); setSearch(''); setShowFilters(false); setGroupPage(1); setWatchTogetherVisible(false);}} style={styles.navItem}>
                <Text style={[styles.navText, activeTab === l && !watchTogetherVisible && styles.activeNavText]}>{l}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setWatchTogetherVisible(true)} style={[styles.navItem, {flexDirection:'row', alignItems:'center', gap:4}]}>
              <Text style={[styles.navText, watchTogetherVisible && styles.activeNavText, peerConnected && {color:'#10b981'}]}>
                {peerConnected ? '🟢 Watch Together' : '👥 Watch Together'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.navItem}>
              <Text style={[styles.navText, showFilters && styles.activeNavText]}>Category ▾</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {!watchTogetherVisible && <View style={styles.adContainer}>
  <Text style={{ color: '#334155', fontSize: 10}}>SPONSORSHIP</Text>
      </View>}
      {!watchTogetherVisible && showFilters && (
        <ScrollView style={styles.filterDrawer}>
          <Text style={styles.filterLabel}>Year Range</Text>
          <View style={styles.dateInputRow}>
            <TextInput style={styles.dateInput} value={yearFrom} onChangeText={handleYearFromChange} placeholder="From" keyboardType="numeric" maxLength={4} />
            <Text style={{color:'#64748b'}}>to</Text>
            <TextInput style={styles.dateInput} value={yearTo} onChangeText={handleYearToChange} placeholder="To" keyboardType="numeric" maxLength={4} />
          </View>
          <Text style={styles.filterLabel}>Month From</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {MONTHS.map(m => (
              <TouchableOpacity key={`f-${m.val}`} style={[styles.chip, monthFrom === m.val && styles.activeChip]} onPress={() => {setMonthFrom(m.val); if (yearFrom === yearTo && parseInt(monthTo) < parseInt(m.val)) setMonthTo(m.val);}}>
                <Text style={[styles.chipText, monthFrom === m.val && styles.activeChipText]}>{m.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.filterLabel}>Month To</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {MONTHS.map(m => (
              <TouchableOpacity key={`t-${m.val}`} style={[styles.chip, monthTo === m.val && styles.activeChip]} onPress={() => {if (!(yearFrom === yearTo && parseInt(m.val) < parseInt(monthFrom))) setMonthTo(m.val);}}>
                <Text style={[styles.chipText, monthTo === m.val && styles.activeChipText]}>{m.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <div style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:15, marginBottom: 10}}>
             <Text style={styles.filterLabel}>Genres</Text>
             <TextInput style={styles.genreMiniSearch} placeholder="Find genre..." placeholderTextColor="#64748b" value={genreSearch} onChangeText={setGenreSearch} />
          </div>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {filteredGenres.map(g => (
              <TouchableOpacity key={g.name} style={[styles.chip, selectedGenre === g.id && styles.activeChip]} onPress={() => setSelectedGenre(g.id)}>
                <Text style={[styles.chipText, selectedGenre === g.id && styles.activeChipText]}>{g.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.filterLabel}>Region</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {COUNTRIES.map(c => (
              <TouchableOpacity key={c.code} style={[styles.chip, selectedCountry === c.code && styles.activeChip]} onPress={() => setSelectedCountry(c.code)}>
                <Text style={[styles.chipText, selectedCountry === c.code && styles.activeChipText]}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={{height: 20}} />
          <TouchableOpacity 
            onPress={() => { setSelectedGenre(null); setSelectedCountry(""); setYearFrom("1990"); setYearTo(CURRENT_YEAR.toString()); setMonthFrom("01"); setMonthTo("12"); }}
            style={{ backgroundColor: '#ef444415', borderWidth: 1, borderColor: '#ef4444', borderRadius: 20, padding: 12, alignItems: 'center', marginBottom: 20 }}
          >
            <Text style={{ color: '#ef4444', fontSize: 12, fontWeight: 'bold' }}>🔄 Reset All Filters</Text>
          </TouchableOpacity>
      </ScrollView>
      )}

      {!watchTogetherVisible && <ScrollView style={{ flex: 1 }}>
        {!search && activeTab === 'Home' && heroMovies.length > 0 && (
          <View style={styles.heroContainer}>
            <View style={styles.trendingHeaderFixed}>
              <div className="blink-dot" style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#ff4b4b' }} />
              <Text style={styles.trendingHeaderText}>TRENDING TODAY</Text>
            </View>
            <ScrollView 
              ref={sliderRef} 
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false} 
              onScroll={handleOnScroll} 
              scrollEventThrottle={16}
              snapToAlignment="center"
              decelerationRate="fast"
              contentContainerStyle={{ width: width * heroMovies.length }}
            >
              {heroMovies.map((m, i) => (
                <View key={i} style={{ width: width, height: 350, overflow: 'hidden' }}>
                  <Image source={{uri: m.banner}} style={styles.heroImage} />
                  <View style={styles.heroOverlay}>
                    <View style={styles.top10Badge}>
                      <Text style={styles.top10Label}>TOP 10</Text>
                    </View>
                    <View style={styles.heroTitleRow}>
                      <Text style={styles.rankNumber}>{i + 1}</Text>
                      <View style={{flex: 1}}>
                        <Text style={styles.heroTitle} numberOfLines={1}>{m.title}</Text>
                        <Text style={styles.heroSynopsis} numberOfLines={2}>{m.synopsis}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.heroPlayBtn} onPress={() => syncAndPlay(m)}>
                      <Text style={styles.heroPlayText}>▶ PLAY NOW</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.dotContainer}>
              {heroMovies.map((_, dotI) => (
                <View key={dotI} style={[styles.dot, heroIndex === dotI && styles.activeDot]} />
              ))}
            </View>
          </View>
        )}

        <View style={styles.movieSection}>
          {loading ? (
             <ActivityIndicator color="#5e96f1" style={{marginTop: 50}} />
          ) : (
            <>
              <View style={styles.movieGrid}>
                {movies.map((item, index) => {
                  const cardW = width < 400 ? (width - 60) / 3 : width < 600 ? (width - 70) / 3 : width < 900 ? (width - 80) / 4 : width < 1200 ? (width - 100) / 5 : (width - 120) / 6;
                  const posterH = cardW * 1.48;
                  return (
                  <React.Fragment key={`${item.id}-${index}`}>
                    {index > 0 && index % 6 === 0 && (
                      <View style={[styles.movieCardAd, {width: cardW}]}>
                         <div id={`grid-ad-${index}`} style={{width:'100%', height: posterH, backgroundColor: '#151f2e', borderRadius: 8, display:'flex', justifyContent:'center', alignItems:'center'}}>
                           <Text style={{color:'#334155', fontSize: 10, textAlign:'center'}}>AD SLOT</Text>
                         </div>
                      </View>
                    )}
                    <TouchableOpacity style={[styles.movieCard, {width: cardW}]} onPress={() => syncAndPlay(item)}>
                      <Image source={{ uri: item.poster }} style={[styles.posterImg, {width: cardW, height: posterH}]} />
                      <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
                    </TouchableOpacity>
                  </React.Fragment>
                  );
                })}
              </View>

              {movies.length > 0 && (
                <View style={styles.paginationRow}>
                  <TouchableOpacity onPress={() => setGroupPage(p => Math.max(1, p-1))} style={[styles.pageBtn, groupPage === 1 && {opacity: 0.5}]} disabled={groupPage === 1}>
                    <Text style={styles.pageBtnText}>PREV</Text>
                  </TouchableOpacity>
                  <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                    <Text style={styles.pageLabel}>1 ... </Text>
                    <TextInput style={styles.pageInput} value={pageInput} onChangeText={setPageInput} onSubmitEditing={jumpToPage} keyboardType="numeric" />
                    <Text style={styles.pageLabel}> ... {totalPages}</Text>
                  </div>
                  <TouchableOpacity onPress={() => setGroupPage(p => Math.min(totalPages, p + 1))} style={[styles.pageBtn, (!hasMore || groupPage >= totalPages) && {opacity: 0.5}]} disabled={!hasMore || groupPage >= totalPages}>
                    <Text style={styles.pageBtnText}>NEXT</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>}

      {selectedMovie && !watchTogetherVisible && (
        <View style={styles.modal}>
          <View style={[styles.modalContent, loadVideo ? { width: '100%', height: '100%', borderRadius: 0 } : { maxHeight: height * 0.9 }]}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => {setSelectedMovie(null); setLoadVideo(false); localStorage.removeItem('selectedMovie'); localStorage.removeItem('loadVideo');}}>
              <Text style={{color:'#fff', fontWeight:'bold'}}>✕</Text>
            </TouchableOpacity>
            {!loadVideo ? (
              <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
                <Image source={{ uri: selectedMovie.banner || selectedMovie.poster }} style={styles.modalBanner} />
                <View style={styles.detailsContainer}>
                  <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'5px'}}>
                    <Text style={styles.releaseLabel}>Released: {selectedMovie.releaseDate}</Text>
                    <Text style={styles.ratingText}>⭐ {selectedMovie.rating.toFixed(1)}</Text>
                  </div>
                  <View style={styles.genreTags}>
                    {getGenreNames(selectedMovie.genreIds).map((gName, idx) => (
                      <View key={idx} style={styles.genreTag}><Text style={styles.genreTagText}>{gName}</Text></View>
                    ))}
                  </View>
                  <Text style={styles.synopsisText}>{selectedMovie.synopsis}</Text>
                  <View style={styles.serverDisplay}>
                     <Text style={styles.serverText}>STREAMING: <Text style={{color:'#5e96f1'}}>BACKEND PROXY</Text></Text>
                  </View>
                  <TouchableOpacity style={styles.watchBtn} onPress={() => setLoadVideo(true)}>
                    <Text style={styles.watchBtnText}>PLAY MOVIE</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : (
              <View style={{flex: 1, backgroundColor: '#000'}}>
                 <iframe 
                    key={`player-${selectedMovie.tmdbId}-${selectedServer}`}
                    src={SERVER_URL(selectedMovie.type, selectedMovie.tmdbId, 0, selectedServer)} 
                    style={{ width: '100%', height: '100%', border: 'none' }} 
                    allowFullScreen 
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                 />
                 <View style={styles.customControls}>
                    {/* Server Switcher */}
                    <Text style={{ color: '#64748b', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                      🎬 Switch Server if video won't play
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 4, marginBottom: 14 }}>
                      {SERVERS.map((server, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setSelectedServer(index)}
                          style={{
                            backgroundColor: selectedServer === index ? '#5e96f1' : '#1e293b',
                            paddingHorizontal: 14,
                            paddingVertical: 7,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: selectedServer === index ? '#5e96f1' : '#334155',
                          }}
                        >
                          <Text style={{ color: selectedServer === index ? '#fff' : '#94a3b8', fontSize: 11, fontWeight: selectedServer === index ? 'bold' : 'normal' }}>
                            {selectedServer === index ? '▶ ' : ''}{server.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <Text style={styles.promoText}>Enjoying the show? 🍿 Invite your friends to <Text style={{color: '#5e96f1', fontWeight: 'bold'}}>CinemaX</Text> for an ad-free, uninterrupted cinematic experience!</Text>
                    <TouchableOpacity style={[styles.copyBtn, copied && {backgroundColor: '#10b981'}]} onPress={handleCopyLink}>
                      <Text style={styles.copyBtnText}>{copied ? (roomId ? "ID COPIED! ✅" : "COPIED! ✅") : (roomId ? "COPY ROOM ID 🔗" : "COPY INVITE LINK 🔗")}</Text>
                    </TouchableOpacity>
                 </View>
              </View>
            )}
          </View>
        </View>
      )}

      {/* ══════════════════════════════════════════════════
          WATCH TOGETHER — FULL SCREEN PAGE
      ══════════════════════════════════════════════════ */}
      {watchTogetherVisible && (
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#0b1622', zIndex: 500, flexDirection: 'column' }} onTouchStart={resetInactivityTimer}>

          {/* ── TOP BAR ── */}
          <View style={{ backgroundColor: '#0d1b2a', borderBottomWidth: 1, borderColor: '#1e293b', paddingTop: 12, paddingBottom: 10, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity onPress={() => { setWatchTogetherVisible(false); if (wtVideoLoaded && wtMovie) setWtPip(true); }} style={{ padding: 6, backgroundColor: '#1e293b', borderRadius: 20 }}>
                <Text style={{ color: '#94a3b8', fontSize: 16, fontWeight: 'bold' }}>←</Text>
              </TouchableOpacity>
              <View>
                <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 0.3 }}>
                  👥 Watch Together
                </Text>
                <Text style={{ color: peerConnected ? '#10b981' : '#64748b', fontSize: 10, marginTop: 1 }}>
                  {peerConnected ? '● Connected & Live' : peer ? '● Ready to connect' : '● Initializing...'}
                </Text>
              </View>
            </View>
            {peerConnected && (
              <TouchableOpacity onPress={leaveRoom} style={{ backgroundColor: '#ef444422', borderWidth: 1, borderColor: '#ef4444', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
                <Text style={{ color: '#ef4444', fontSize: 11, fontWeight: 'bold' }}>Leave Room</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ── STATUS BANNER ── */}
          {!!wtStatus && (
            <View style={{ backgroundColor: peerConnected ? '#052e1c' : '#0f172a', borderBottomWidth: 1, borderColor: peerConnected ? '#10b981' : '#334155', paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ color: peerConnected ? '#10b981' : '#94a3b8', fontSize: 12, flex: 1 }}>{wtStatus}</Text>
            </View>
          )}

          {/* ── MAIN CONTENT AREA ── */}
          <View style={{ flex: 1, flexDirection: width > 768 ? 'row' : 'column' }}>

            {/* LEFT / TOP: VIDEO PANEL */}
            <View style={{
              flex: wtVideoMinimized ? 0 : (width > 768 ? 0.55 : 0.45),
              backgroundColor: '#000',
              minHeight: wtVideoMinimized ? 0 : (width > 768 ? '100%' : 220),
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Video / Placeholder */}
              {!wtMovie ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 20 }}>
                  <Text style={{ fontSize: 48 }}>🎬</Text>
                  <Text style={{ color: '#475569', fontSize: 14, textAlign: 'center' }}>
                    {hostMode || !peerConnected
                      ? 'No movie selected yet.\nPick a movie to start the session.'
                      : 'Waiting for host to pick a movie...'}
                  </Text>
                  {hostMode && (
                    <TouchableOpacity
                      onPress={() => setWtShowMoviePicker(true)}
                      style={{ backgroundColor: '#5e96f1', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25, marginTop: 8 }}
                    >
                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>🎞 Browse & Pick Movie</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : wtVideoLoaded ? (
                <View style={{ flex: 1, position: 'relative' }}>
                  <style>{`
                    @keyframes fadeOutOverlay { 0%{opacity:1} 70%{opacity:1} 100%{opacity:0;pointer-events:none} }
                    .wt-autoplay-overlay { animation: fadeOutOverlay 1s forwards; background:transparent; position:absolute; inset:0; z-index:5; cursor:pointer; }
                  `}</style>
                  <iframe
                    key={`wt-iframe-${wtMovie?.tmdbId}-${wtIframeKey}`}
                    src={SERVER_URL(wtMovie.type, wtMovie.tmdbId, Math.max(0, wtLoadedOffset), selectedServer)}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    allowFullScreen
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                    onLoad={(e: any) => {
                      try { e.target.contentWindow?.postMessage({ type: 'play' }, '*'); } catch(_) {}
                    }}
                  />
                  <div className="wt-autoplay-overlay" onClick={() => {}} />
                  {/* Controls overlay — Minimize only; Sync/Change are in the top room strip */}
                  <View style={{ position: 'absolute', top: 10, right: 10, gap: 8, zIndex: 10 }}>
                    <TouchableOpacity onPress={() => setWtVideoMinimized(true)}
                      style={{ backgroundColor: 'rgba(0,0,0,0.75)', padding: 8, borderRadius: 20 }}>
                      <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>⬇ Min</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Host Sync Input Panel */}
                  {hostMode && wtShowSyncInput && (
                    <View style={{ position: 'absolute', top: 10, left: 10, right: 90, zIndex: 20, backgroundColor: 'rgba(11,22,34,0.97)', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#10b981' }}>
                      <Text style={{ color: '#10b981', fontWeight: 'bold', fontSize: 12, marginBottom: 4 }}>📡 Push Sync to Guest</Text>
                      {hostDisplayTime > 0 ? (
                        <View style={{ backgroundColor: '#052e1c', borderRadius: 8, padding: 10, marginBottom: 10 }}>
                          <Text style={{ color: '#64748b', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Real video time (from player)</Text>
                          <Text style={{ color: '#10b981', fontSize: 20, fontWeight: '900' }}>
                            {fmtHMS(hostDisplayTime)}
                          </Text>
                          <Text style={{ color: '#475569', fontSize: 10, marginTop: 2 }}>Guest will jump to this exact position</Text>
                        </View>
                      ) : (
                        <Text style={{ color: '#64748b', fontSize: 10, marginBottom: 10 }}>Waiting for player to report time... (play the video first)</Text>
                      )}
                      <Text style={{ color: '#475569', fontSize: 10, marginBottom: 6 }}>Or override manually:</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <TextInput
                          style={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: 8, padding: 8, width: 55, textAlign: 'center', fontSize: 15, fontWeight: 'bold', borderWidth: 1, borderColor: '#334155' }}
                          value={wtSyncMinutes} onChangeText={setWtSyncMinutes}
                          placeholder="0" placeholderTextColor="#475569" keyboardType="numeric" maxLength={3}
                        />
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>m</Text>
                        <TextInput
                          style={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: 8, padding: 8, width: 55, textAlign: 'center', fontSize: 15, fontWeight: 'bold', borderWidth: 1, borderColor: '#334155' }}
                          value={wtSyncSeconds} onChangeText={setWtSyncSeconds}
                          placeholder="0" placeholderTextColor="#475569" keyboardType="numeric" maxLength={2}
                        />
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>s</Text>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity onPress={wtHostSeekSync}
                          style={{ flex: 1, backgroundColor: '#10b981', padding: 10, borderRadius: 20, alignItems: 'center' }}>
                          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>📡 Push to Guest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setWtShowSyncInput(false)}
                          style={{ backgroundColor: '#1e293b', padding: 10, borderRadius: 20, paddingHorizontal: 14 }}>
                          <Text style={{ color: '#94a3b8', fontSize: 12 }}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {/* Guest drift indicator */}
                  {!hostMode && wtDriftSeconds !== null && (
                    <View style={{ position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 }}>
                      <Text style={{ color: '#10b981', fontSize: 10, fontWeight: 'bold' }}>
                        🕐 Host at {fmtHMS(wtDriftSeconds)}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                /* Movie info card — pre-play state */
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#0b1622' }}>
                  <Image source={{ uri: wtMovie.poster }} style={{ width: 110, height: '100%', resizeMode: 'cover' }} />
                  <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
                    <View>
                      <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16, marginBottom: 4 }} numberOfLines={2}>{wtMovie.title}</Text>
                      <Text style={{ color: '#64748b', fontSize: 11, marginBottom: 8 }}>⭐ {wtMovie.rating?.toFixed(1)} · {wtMovie.releaseDate?.slice(0,4)}</Text>
                      <Text style={{ color: '#94a3b8', fontSize: 12, lineHeight: 18 }} numberOfLines={4}>{wtMovie.synopsis}</Text>
                    </View>
                    {/* HOST: play + sync */}
                    {hostMode ? (
                      <View style={{ gap: 8 }}>
                        <TouchableOpacity
                          onPress={wtHostPlay}
                          style={{ backgroundColor: '#5e96f1', padding: 14, borderRadius: 25, alignItems: 'center' }}
                        >
                          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>▶ Play & Sync to Friend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setWtShowMoviePicker(true)} style={{ backgroundColor: '#1e293b', padding: 10, borderRadius: 20, alignItems: 'center' }}>
                          <Text style={{ color: '#94a3b8', fontSize: 12 }}>🔄 Change Movie</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      /* GUEST: sync button */
                      <View style={{ gap: 8 }}>
                        <TouchableOpacity
                          onPress={wtGuestSync}
                          style={{ backgroundColor: '#10b981', padding: 14, borderRadius: 25, alignItems: 'center' }}
                        >
                          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>🔗 Sync & Play</Text>
                        </TouchableOpacity>
                        {wtDriftSeconds !== null && (
                          <Text style={{ color: '#f59e0b', fontSize: 11, textAlign: 'center', fontWeight: 'bold' }}>
                            ⏱ Host is at ~{fmtHMS(wtDriftSeconds)}
                          </Text>
                        )}
                        <Text style={{ color: '#475569', fontSize: 10, textAlign: 'center' }}>
                          {guestStartTsRef.current ? 'Tap to jump to host\'s current position.' : 'Waiting for host to start playback...'}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

              {/* Minimized bar */}
              {wtVideoMinimized && wtMovie && (
                <View style={{ display: 'none' }} />
              )}
            </View>

            {/* Minimized video pill — shown below top bar when minimized */}
            {wtVideoMinimized && wtMovie && wtVideoLoaded && (
              <View style={{ backgroundColor: '#151f2e', borderBottomWidth: 1, borderColor: '#1e293b', paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image source={{ uri: wtMovie.poster }} style={{ width: 32, height: 46, borderRadius: 4 }} />
                  <View>
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }} numberOfLines={1}>{wtMovie.title}</Text>
                    <Text style={{ color: '#64748b', fontSize: 10 }}>▶ Playing</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setWtVideoMinimized(false)}
                  style={{ backgroundColor: '#5e96f1', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 }}
                >
                  <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>⬆ Expand</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* RIGHT / BOTTOM: SIDEBAR */}
            <View style={{ flex: 1, backgroundColor: '#0b1622', borderLeftWidth: width > 768 ? 1 : 0, borderTopWidth: width <= 768 ? 1 : 0, borderColor: '#1e293b', flexDirection: 'column' }}>

              {/* ── NOT CONNECTED: Room setup ── */}
              {!peerConnected ? (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 16 }}>

                  {/* CREATE ROOM */}
                  <View style={{ backgroundColor: '#151f2e', borderRadius: 14, padding: 16 }}>
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15, marginBottom: 4 }}>🏠 Host a Room</Text>
                    <Text style={{ color: '#64748b', fontSize: 12, marginBottom: 14, lineHeight: 18 }}>Create a room and share your Room ID with a friend so they can join.</Text>
                    {!roomId ? (
                      <TouchableOpacity
                        onPress={createRoom}
                        disabled={!peer}
                        style={{ backgroundColor: '#5e96f1', padding: 16, borderRadius: 25, alignItems: 'center', opacity: peer ? 1 : 0.5 }}
                      >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>
                          {peer ? '✨ Create Room' : '⏳ Connecting to server...'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <View style={{ backgroundColor: '#0b1622', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#5e96f1', marginBottom: 12 }}>
                          <Text style={{ color: '#64748b', fontSize: 10, fontWeight: 'bold', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Your Room ID</Text>
                          <Text style={{ color: '#5e96f1', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 }} selectable>{roomId}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                          <TouchableOpacity
                            onPress={() => { navigator.clipboard.writeText(roomId); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                            style={{ flex: 1, backgroundColor: copied ? '#10b981' : '#5e96f1', padding: 14, borderRadius: 20, alignItems: 'center' }}
                          >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>{copied ? '✅ Copied!' : '📋 Copy Room ID'}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={createRoom}
                            style={{ backgroundColor: '#ef444415', paddingHorizontal: 16, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ef4444' }}
                          >
                            <Text style={{ color: '#ef4444', fontSize: 12, fontWeight: 'bold' }}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 }}>
                          <div className="blink-dot" style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#f59e0b', flexShrink: 0 }} />
                          <Text style={{ color: '#f59e0b', fontSize: 11 }}>Waiting for friend to join...</Text>
                        </View>
                      </>
                    )}
                  </View>

                  {/* DIVIDER */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#1e293b' }} />
                    <Text style={{ color: '#475569', fontSize: 12 }}>OR</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#1e293b' }} />
                  </View>

                  {/* JOIN ROOM */}
                  <View style={{ backgroundColor: '#151f2e', borderRadius: 14, padding: 16 }}>
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15, marginBottom: 4 }}>🔗 Join a Room</Text>
                    <Text style={{ color: '#64748b', fontSize: 12, marginBottom: 14, lineHeight: 18 }}>Enter your friend's Room ID to sync and watch together.</Text>
                    <TextInput
                      style={{ backgroundColor: '#0b1622', color: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 13, borderWidth: 1, borderColor: '#334155', marginBottom: 12 }}
                      value={joinCode}
                      onChangeText={setJoinCode}
                      placeholder="Paste Room ID here..."
                      placeholderTextColor="#475569"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={joinRoom}
                      disabled={!peer || !joinCode.trim()}
                      style={{ backgroundColor: '#10b981', padding: 16, borderRadius: 25, alignItems: 'center', opacity: (peer && joinCode.trim()) ? 1 : 0.4 }}
                    >
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>🚀 Join Room</Text>
                    </TouchableOpacity>
                  </View>

                  {/* HOW IT WORKS */}
                  <View style={{ backgroundColor: '#151f2e', borderRadius: 14, padding: 16 }}>
                    <Text style={{ color: '#5e96f1', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>ℹ How it works</Text>
                    {[
                      ['1️⃣', 'One person taps Create Room and shares their Room ID.'],
                      ['2️⃣', 'The other person pastes it and taps Join Room.'],
                      ['3️⃣', 'The host picks a movie and taps Play & Sync.'],
                      ['4️⃣', 'Guest taps Sync & Watch — you\'re watching together!'],
                    ].map(([emoji, text], i) => (
                      <View key={i} style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <Text style={{ fontSize: 16 }}>{emoji}</Text>
                        <Text style={{ color: '#94a3b8', fontSize: 12, lineHeight: 18, flex: 1 }}>{text}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>

              ) : (
                /* ── CONNECTED: chat + controls ── */
                <View style={{ flex: 1, flexDirection: 'column' }}>

                  {/* Room info strip */}
                  <View style={{ backgroundColor: '#052e1c', padding: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={{ color: '#10b981', fontWeight: 'bold', fontSize: 12 }}>
                        {hostMode ? '👑 You are the Host' : '🎟 You are a Guest'}
                      </Text>
                      <Text style={{ color: '#059669', fontSize: 10 }}>
                        {hostMode
                          ? (hostDisplayTime > 0
                              ? `🎬 ${fmtHMS(hostDisplayTime)} · Room: ${roomId.slice(0,8)}...`
                              : `Room ID: ${roomId.slice(0,8)}...`)
                          : `Host ID: ${joinCode.slice(0,8)}...`}
                      </Text>
                    </View>
                    {hostMode && (
                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        {wtVideoLoaded && (
                          <TouchableOpacity
                            onPress={() => setWtShowSyncInput(s => !s)}
                            style={{ backgroundColor: '#10b98122', borderWidth: 1, borderColor: '#10b981', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 15 }}
                          >
                            <Text style={{ color: '#10b981', fontWeight: 'bold', fontSize: 10 }}>📡 Sync</Text>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          onPress={() => setWtShowMoviePicker(true)}
                          style={{ backgroundColor: '#5e96f1', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 }}
                        >
                          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 11 }}>{wtMovie ? '🔄 Change Movie' : '🎞 Pick Movie'}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {!hostMode && wtVideoLoaded && (
                      <TouchableOpacity
                        onPress={wtGuestSync}
                        style={{ backgroundColor: '#10b98122', borderWidth: 1, borderColor: '#10b981', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 15 }}
                      >
                        <Text style={{ color: '#10b981', fontWeight: 'bold', fontSize: 10 }}>🔗 Resync</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Chat area */}
                  <ScrollView
                    ref={wtChatScrollRef}
                    style={{ flex: 1, backgroundColor: '#0b1622' }}
                    contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
                    onContentSizeChange={() => wtChatScrollRef.current?.scrollToEnd({ animated: true })}
                  >
                    {wtChatMessages.length === 0 ? (
                      <View style={{ alignItems: 'center', marginTop: 40, gap: 8 }}>
                        <Text style={{ fontSize: 32 }}>💬</Text>
                        <Text style={{ color: '#475569', fontSize: 13, textAlign: 'center' }}>No messages yet.{'\n'}Say hi to your watch party!</Text>
                      </View>
                    ) : wtChatMessages.map((msg, i) => (
                      <View key={i} style={{ marginBottom: 10, alignItems: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                        <Text style={{ color: '#475569', fontSize: 9, fontWeight: 'bold', marginBottom: 3, textTransform: 'uppercase', flexWrap: 'wrap' }}>
                          {msg.from === 'me' ? 'You' : 'Friend'} · {msg.time}
                        </Text>
                        <View style={{ backgroundColor: msg.from === 'me' ? '#5e96f1' : '#1e293b', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18, maxWidth: '80%', borderBottomRightRadius: msg.from === 'me' ? 4 : 18, borderBottomLeftRadius: msg.from === 'me' ? 18 : 4 }}>
                          <Text style={{ color: '#fff', fontSize: 13, lineHeight: 18 }}>{msg.text}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>

                  {/* Chat input */}
                  <View style={{ backgroundColor: '#151f2e', padding: 12, flexDirection: 'row', gap: 10, alignItems: 'center', borderTopWidth: 1, borderColor: '#1e293b' }}>
                    <TextInput
                      style={{ flex: 1, backgroundColor: '#0b1622', color: '#fff', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, fontSize: 13, borderWidth: 1, borderColor: '#334155' }}
                      value={wtChatInput}
                      onChangeText={setWtChatInput}
                      placeholder="Say something to your friend..."
                      placeholderTextColor="#475569"
                      onSubmitEditing={sendWtChat}
                      returnKeyType="send"
                    />
                    <TouchableOpacity
                      onPress={sendWtChat}
                      style={{ backgroundColor: '#5e96f1', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 25 }}
                    >
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* ── MOVIE PICKER OVERLAY (Host Only) ── */}
          {wtShowMoviePicker && (
            <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#0b1622', zIndex: 100, flexDirection: 'column' }}>
              {/* Header */}
              <View style={{ backgroundColor: '#0d1b2a', padding: 16, borderBottomWidth: 1, borderColor: '#1e293b' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16 }}>🎞 Pick a Movie</Text>
                  <TouchableOpacity onPress={() => setWtShowMoviePicker(false)}>
                    <Text style={{ color: '#94a3b8', fontSize: 20, fontWeight: 'bold' }}>✕</Text>
                  </TouchableOpacity>
                </View>
                {/* Search bar */}
                <TextInput
                  style={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, fontSize: 13, borderWidth: 1, borderColor: '#334155', marginBottom: 10 }}
                  value={wtPickerSearch}
                  onChangeText={t => { setWtPickerSearch(t); setWtPickerPage(1); }}
                  placeholder="🔍  Search movies & series..."
                  placeholderTextColor="#475569"
                />
                {/* Type toggle */}
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
                  {(['movie', 'tv'] as const).map(t => (
                    <TouchableOpacity key={t} onPress={() => { setWtPickerType(t); setWtPickerPage(1); }}
                      style={{ paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, backgroundColor: wtPickerType === t ? '#5e96f1' : '#1e293b', borderWidth: 1, borderColor: wtPickerType === t ? '#5e96f1' : '#334155' }}>
                      <Text style={{ color: wtPickerType === t ? '#fff' : '#94a3b8', fontSize: 12, fontWeight: 'bold' }}>{t === 'movie' ? '🎬 Movies' : '📺 Series'}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/* Genre filter */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {GENRES.slice(0, 10).map(g => (
                    <TouchableOpacity key={g.name} onPress={() => { setWtPickerGenre(g.id); setWtPickerPage(1); }}
                      style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, marginRight: 8, backgroundColor: wtPickerGenre === g.id ? '#5e96f122' : '#1e293b', borderWidth: 1, borderColor: wtPickerGenre === g.id ? '#5e96f1' : '#334155' }}>
                      <Text style={{ color: wtPickerGenre === g.id ? '#5e96f1' : '#94a3b8', fontSize: 11 }}>{g.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Movie grid */}
              <ScrollView
                contentContainerStyle={{ padding: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' } as any}
                onScroll={({ nativeEvent }) => {
                  const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 200 && !wtPickerLoading && wtPickerHasMore) {
                    fetchWtPickerMovies(false);
                  }
                }}
                scrollEventThrottle={400}
              >
                {wtPickerMovies.map((item, idx) => {
                  const cardW = width < 400 ? (width - 60) / 3 : width < 600 ? (width - 70) / 3 : 105;
                  return (
                    <TouchableOpacity key={idx} onPress={() => wtPickMovie(item)} style={{ width: cardW }}>
                      <Image source={{ uri: item.poster }} style={{ width: cardW, height: cardW * 1.48, borderRadius: 8, borderWidth: wtMovie?.tmdbId === item.tmdbId ? 2 : 0, borderColor: '#5e96f1' }} />
                      <Text style={{ color: '#cbd5e1', fontSize: 10, textAlign: 'center', marginTop: 4 }} numberOfLines={2}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })}
                {wtPickerLoading && <ActivityIndicator color="#5e96f1" style={{ marginVertical: 20, width: '100%' as any }} />}
                {!wtPickerLoading && wtPickerHasMore && wtPickerMovies.length > 0 && (
                  <TouchableOpacity onPress={() => fetchWtPickerMovies(false)} style={{ backgroundColor: '#1e293b', padding: 12, borderRadius: 20, marginVertical: 10, paddingHorizontal: 24 }}>
                    <Text style={{ color: '#5e96f1', fontWeight: 'bold' }}>Load More</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
          )}

        </View>
      )}

      {/* ══ WATCH TOGETHER PiP — plays in corner when user goes back to main menu ══ */}
      {wtPip && wtMovie && wtVideoLoaded && !watchTogetherVisible && (
        <View style={{
          position: 'absolute', bottom: 90, right: 16, width: 200, height: 120,
          borderRadius: 12, overflow: 'hidden', zIndex: 800,
          borderWidth: 2, borderColor: '#5e96f1',
          shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 10,
        }}>
          <iframe
            key={`pip-${wtMovie.tmdbId}`}
            src={SERVER_URL(wtMovie.type, wtMovie.tmdbId)}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; fullscreen"
            sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
          />
          {/* PiP controls */}
          <View style={{ position: 'absolute', top: 4, right: 4, flexDirection: 'row', gap: 4 }}>
            <TouchableOpacity
              onPress={() => { setWatchTogetherVisible(true); setWtPip(false); }}
              style={{ backgroundColor: 'rgba(94,150,241,0.9)', padding: 4, borderRadius: 10 }}
            >
              <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold' }}>⬆ Expand</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setWtPip(false); setWtVideoLoaded(false); }}
              style={{ backgroundColor: 'rgba(0,0,0,0.8)', padding: 4, borderRadius: 10 }}
            >
              <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          </View>
          {/* Room badge */}
          <View style={{ position: 'absolute', bottom: 4, left: 4, backgroundColor: 'rgba(16,185,129,0.85)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>
            <Text style={{ color: '#fff', fontSize: 8, fontWeight: 'bold' }}>👥 LIVE</Text>
          </View>
        </View>
      )}

      {/* ══ AI CHATBOT — 3 states: peek edge / full fab / full screen ══ */}
      <style>{`
        @keyframes slideInRight { from { transform: translateX(52px); } to { transform: translateX(0); } }
        @keyframes slideOutRight { from { transform: translateX(0); } to { transform: translateX(52px); } }
        .ai-peek { animation: none; }
        @keyframes chatFadeIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>

      {/* PEEK state — just a sliver visible on the right edge */}
      {chatMode === 'hidden' && (
        <TouchableOpacity
          onPress={handleFabClick}
          activeOpacity={0.9}
          style={{
            position: 'absolute', right: -44, bottom: 120, zIndex: 998,
            width: 65, height: 65, borderRadius: 32.5,
            backgroundColor: '#5e96f1',
            justifyContent: 'center', alignItems: 'center',
            borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)',
            shadowColor: '#5e96f1', shadowOpacity: 0.5, shadowRadius: 10,
          }}
        >
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png' }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          {/* Green dot */}
          <View style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderRadius: 5, backgroundColor: '#10b981', borderWidth: 1.5, borderColor: '#5e96f1' }} />
        </TouchableOpacity>
      )}

      {/* FAB state — full button visible, click opens chat */}
      {chatMode === 'fab' && (
        <TouchableOpacity
          onPress={handleFabClick}
          activeOpacity={0.8}
          style={{
            position: 'absolute', right: 20, bottom: 120, zIndex: 998,
            width: 65, height: 65, borderRadius: 32.5,
            backgroundColor: '#5e96f1',
            justifyContent: 'center', alignItems: 'center',
            borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)',
            shadowColor: '#5e96f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.6, shadowRadius: 12,
            elevation: 12,
          }}
        >
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png' }} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
          <View style={{ position: 'absolute', bottom: 8, right: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: '#10b981', borderWidth: 1.5, borderColor: '#5e96f1' }} />
        </TouchableOpacity>
      )}

      {/* OPEN state — full screen chat */}
      {chatMode === 'open' && (
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#0b1622', zIndex: 1000, flexDirection: 'column' }}>
          {/* Chat Header */}
          <View style={{ backgroundColor: '#0d1b2a', borderBottomWidth: 1, borderColor: '#1e293b', paddingTop: 14, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <TouchableOpacity
                onPress={closeChatToFab}
                style={{ padding: 6, backgroundColor: '#1e293b', borderRadius: 20 }}
              >
                <Text style={{ color: '#94a3b8', fontSize: 16, fontWeight: 'bold' }}>←</Text>
              </TouchableOpacity>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png' }} style={{ width: 34, height: 34 }} />
              <View>
                <Text style={{ color: '#5e96f1', fontWeight: '900', fontSize: 17, letterSpacing: 0.3 }}>CinemaX <Text style={{ color: '#fff' }}>AI</Text></Text>
                <Text style={{ color: '#10b981', fontSize: 10, marginTop: 1 }}>● Online · Ready to help</Text>
              </View>
            </View>
            <TouchableOpacity onPress={clearChat}>
              <Text style={{ color: '#ef4444', fontSize: 11, fontWeight: 'bold' }}>CLEAR</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1, backgroundColor: '#0b1622' }}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((msg, i) => (
              <View key={i} style={[styles.msgWrapper, msg.role === 'user' ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
                <View style={[styles.msgBubble, msg.role === 'user' ? styles.userMsg : styles.botMsg]}>
                  {msg.role === 'user' ? (
                    <Text style={styles.msgText}>{msg.content}</Text>
                  ) : (
                    <Markdown style={markdownStyles}>{msg.content}</Markdown>
                  )}
                  <Text style={styles.msgTime}>{msg.timestamp || 'Just now'}</Text>
                </View>
                <Text style={styles.msgTime}>{msg.role === 'user' ? 'You' : 'CinemaX AI'}</Text>
              </View>
            ))}
            {isTyping && (
              <View style={styles.typingContainer}>
                <ActivityIndicator size="small" color="#5e96f1" />
                <Text style={styles.typingText}>CinemaX is thinking...</Text>
              </View>
            )}
          </ScrollView>

          {/* Quick Replies */}
          <View style={styles.quickReplyContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickReplyScroll}>
              {["🔥 Trending", "🍿 Horror", "🎬 Top 10", "🎭 Drama", "🌏 K-Drama", "🎌 Anime"].map((suggestion, index) => (
                <TouchableOpacity key={index} style={styles.quickReplyChip} onPress={() => setChatInput(suggestion)}>
                  <Text style={styles.quickReplyText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Input */}
          <View style={styles.chatInputRow}>
            <TextInput
              style={styles.chatInput}
              value={chatInput}
              onChangeText={setChatInput}
              placeholder="Ask for a movie recommendation..."
              placeholderTextColor="#64748b"
              onSubmitEditing={askAI}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={askAI} style={styles.sendBtn}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>SEND</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1622', overflow: 'hidden', maxWidth: '100vw' as any },
  header: { backgroundColor: '#151f2e', borderBottomWidth: 1, borderColor: '#1e293b' },
  logo: { color: '#fff', fontSize: 20, fontWeight: '900' },
  searchBar: { flex: 1, backgroundColor: '#0b1622', color: '#fff', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, fontSize: 13, border: '1px solid #1e293b', minWidth: 0 },
  navRow: { paddingBottom: 10 },
  navScroll: { paddingHorizontal: 15 },
  navItem: { marginRight: 25 },
  navText: { color: '#cbd5e1', fontSize: 14, fontWeight: '600' },
  activeNavText: { color: '#5e96f1' },
  adContainer: { backgroundColor: '#151f2e', width: '100%' as any, maxWidth: 320, height: 70, alignSelf: 'center', marginVertical: 10, justifyContent: 'center', alignItems: 'center' },
  adLabel: { color: '#475569', fontSize: 9, textAlign: 'center', marginBottom: 2 },
  movieCardAd: { width: 105, height: 180, marginBottom: 10, backgroundColor: '#151f2e', borderRadius: 8, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  stickyAd: { position: 'absolute', bottom: 0, width: '100%', height: 60, backgroundColor: 'rgba(11, 22, 34, 0.95)', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
  filterDrawer: { backgroundColor: '#1a2436', paddingHorizontal: 15, borderBottomWidth: 1, borderColor: '#1e293b', maxHeight: 400 },
  filterLabel: { color: '#64748b', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, marginTop: 15 },
  filterRow: { marginBottom: 5 },
  dateInputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 },
  dateInput: { backgroundColor: '#0b1622', color: '#fff', padding: 10, borderRadius: 8, width: 100, textAlign: 'center', border: '1px solid #334155' },
  genreMiniSearch: { backgroundColor: '#0b1622', color: '#fff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15, fontSize: 11, width: 120, border: '1px solid #334155' },
  chip: { backgroundColor: '#0b1622', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, border: '1px solid #334155' },
  activeChip: { borderColor: '#5e96f1', backgroundColor: '#5e96f122' },
  chipText: { color: '#cbd5e1', fontSize: 12 },
  activeChipText: { color: '#5e96f1', fontWeight: 'bold' },
  trendingHeaderFixed: { position: 'absolute', top: 15, left: 15, zIndex: 10, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(15, 23, 42, 0.6)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
  trendingHeaderText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  heroContainer: { height: 350, backgroundColor: '#000', position: 'relative', width: '100%', overflow: 'hidden' },
  heroImage: { width: '100%', height: 350, opacity: 0.6, resizeMode: 'cover' },
  heroOverlay: { position: 'absolute', bottom: 45, left: 20, right: 20 },
  top10Badge: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 3, alignSelf: 'flex-start', border: '1px solid #fff', marginBottom: 5 },
  top10Label: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  heroTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rankNumber: { color: 'rgba(255,255,255,0.4)', fontSize: 80, fontWeight: '900', lineHeight: 80, marginTop: -10 },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  heroSynopsis: { color: '#94a3b8', fontSize: 12, marginVertical: 10 },
  heroPlayBtn: { backgroundColor: '#5e96f1', padding: 10, borderRadius: 5, alignSelf: 'flex-start' },
  heroPlayText: { color: '#fff', fontWeight: 'bold' },
  dotContainer: { position: 'absolute', bottom: 15, width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  activeDot: { backgroundColor: '#5e96f1', width: 20 },
  movieSection: { padding: 10, minHeight: 400, width: '100%' as any },
  movieGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  movieCard: { marginBottom: 10 },
  movieCardAd: { marginBottom: 10, opacity: 0.8 },
  posterImg: { borderRadius: 8 },
  movieTitle: { color: '#cbd5e1', fontSize: 11, textAlign: 'center', marginTop: 6 },
  paginationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginVertical: 40 },
  pageLabel: { color: '#64748b', fontSize: 12 },
  pageInput: { backgroundColor: '#1e293b', color: '#fff', padding: 5, width: 45, textAlign: 'center', borderRadius: 5, border: '1px solid #334155' },
  pageBtn: { backgroundColor: '#5e96f1', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5 },
  pageBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  modal: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000, justifyContent: 'center', alignItems: 'center', padding: 8 },
  modalContent: { width: '100%', maxWidth: 700, backgroundColor: '#0b1622', borderRadius: 12, overflow: 'hidden' },
  closeBtn: { position: 'absolute', top: 15, right: 15, zIndex: 30, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 20 },
  modalBanner: { width: '100%', height: 200, resizeMode: 'cover' },
  detailsContainer: { padding: 20 },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  releaseLabel: { color: '#64748b', fontSize: 12 },
  ratingText: { color: '#5e96f1', fontSize: 18, fontWeight: 'bold' },
  genreTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 12 },
  genreTag: { backgroundColor: '#1e293b', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, border: '1px solid #334155' },
  genreTagText: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold' },
  synopsisText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22 },
  serverDisplay: { marginTop: 20, padding: 10, backgroundColor: '#151f2e', borderRadius: 8, borderLeftWidth: 4, borderColor: '#5e96f1' },
  serverText: { color: '#fff', fontWeight: '900', fontSize: 12, letterSpacing: 1 },
  watchBtn: { backgroundColor: '#5e96f1', padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 25, shadowColor: '#5e96f1', shadowOpacity: 0.4, shadowRadius: 10 },
  watchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  customControls: { backgroundColor: '#151f2e', padding: 20, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderColor: '#1e293b' },
  promoText: { color: '#94a3b8', fontSize: 12, textAlign: 'center', lineHeight: 18, maxWidth: '80%', marginBottom: 15 },
  copyBtn: { backgroundColor: '#5e96f1', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  copyBtnText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  botIconImg: { width: 35, height: 35, resizeMode: 'contain'},
  aiFab: { 
    position: 'absolute', bottom: 25, right: 25, width: 65, height: 65, borderRadius: 32.5, 
    backgroundColor: '#5e96f1', justifyContent: 'center', alignItems: 'center', zIndex: 999,
    shadowColor: '#5e96f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.6, shadowRadius: 12,
    elevation: 12, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)'
  },
  aiIconCircle: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  onlineIndicator: { position: 'absolute', bottom: 15, right: 15, width: 10, height: 10, borderRadius: 5, backgroundColor: '#10b981', borderWidth: 1.5, borderColor: '#5e96f1' },
  chatWindow: { 
    position: 'absolute', bottom: 100, right: 10, 
    width: '95%' as any, 
    maxWidth: 400,
    height: '60%' as any, 
    maxHeight: 600, minHeight: 350, backgroundColor: '#151f2e', borderRadius: 20, zIndex: 1000, 
    overflow: 'hidden', borderWidth: 1, borderColor: '#1e293b', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 20, elevation: 15,
  },
  chatHeader: { padding: 20, backgroundColor: '#1e293b', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: '#334155' },
  chatTitle: { color: '#5e96f1', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 },
  chatStatus: { color: '#64748b', fontSize: 10, marginTop: 2 },
  chatBody: { flex: 1, padding: 15, backgroundColor: '#0b1622' },
  msgWrapper: { marginBottom: 15 },
  msgBubble: { padding: 12, borderRadius: 18, maxWidth: '85%' },
  userMsg: { alignSelf: 'flex-end', backgroundColor: '#5e96f1', borderBottomRightRadius: 2 },
  botMsg: { alignSelf: 'flex-start', backgroundColor: '#1e293b', borderBottomLeftRadius: 2, borderWidth: 1, borderColor: '#334155' },
  msgText: { color: '#fff', fontSize: 13, lineHeight: 18 },
  msgTime: { color: '#475569', fontSize: 9, marginTop: 4, fontWeight: 'bold', textTransform: 'uppercase', flexWrap: 'wrap' },
  typingContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 5 },
  typingText: { color: '#64748b', fontSize: 11, fontStyle: 'italic' },
  quickReplyContainer: { paddingVertical: 10, backgroundColor: '#0b1622', borderTopWidth: 1, borderColor: '#1e293b' },
  quickReplyScroll: { paddingHorizontal: 15, gap: 10 },
  quickReplyChip: { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, borderWidth: 1, borderColor: '#334155' },
  quickReplyText: { color: '#cbd5e1', fontSize: 11 },
  chatInputRow: { flexDirection: 'row', padding: 15, backgroundColor: '#1e293b', gap: 10, alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: '#0b1622', color: '#fff', borderRadius: 25, paddingHorizontal: 18, fontSize: 13, height: 45, borderWidth: 1, borderColor: '#334155' },
  sendBtn: { backgroundColor: '#5e96f1', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, justifyContent: 'center' },
  downloadButton: {
  backgroundColor: '#1e293b',
  padding: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#5e96f1',
  alignItems: 'center',
  marginVertical: 10,
  width: '100%',
}
});

const markdownStyles = StyleSheet.create({
  body: {
    color: '#fff', 
    fontSize: 13,
    lineHeight: 18,
  },
  strong: {
    fontWeight: 'bold',
    color: '#00DDFF', // Blue color for bolded titles
  },
  bullet_list: {
    marginVertical: 10,
  },
  list_item: {
    color: '#fff',
    fontSize: 13,
  },
});
