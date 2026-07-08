# SportsVerse - Quick Start Guide

## 🚀 Get Real Cricket Data in 5 Minutes

### What You'll Do
1. Sign up for free cricket API (1 minute)
2. Copy your API key (30 seconds)
3. Add to `.env.local` (1 minute)
4. Restart dev server (1 minute)
5. See real cricket data! (30 seconds)

---

## Step-by-Step

### Step 1: Choose Your API Provider

**Recommended: Highlightly ⭐**
- Free tier: 1,000 requests/month (plenty for dev)
- Coverage: 900+ leagues in 80+ countries
- Setup: Very simple
- Website: https://highlightly.net

**Alternatives:**
- RapidAPI: https://rapidapi.com (search "cricket")
- EntitySport: https://entitysport.com
- Sportmonks: https://sportmonks.com (paid)

### Step 2: Get Your API Key

**For Highlightly:**
```
1. Go to https://highlightly.net
2. Click "Sign Up" (top right)
3. Fill in email and create account
4. Verify email (check inbox)
5. Login to dashboard
6. Find "API Keys" section
7. Copy your API key (it's a long string)
```

### Step 3: Configure SportsVerse

```bash
# Navigate to project
cd d:\SportsVerse\sportsverse

# Copy example configuration
copy .env.local.example .env.local

# Edit .env.local with your API key
# Open in any text editor:
# 
# NEXT_PUBLIC_CRICKET_API_PROVIDER=highlightly
# CRICKET_API_KEY=YOUR_API_KEY_HERE  ← Replace this
# ENABLE_REAL_CRICKET_DATA=true
# ENABLE_MOCK_DATA=false
```

### Step 4: Restart Dev Server

```bash
# Stop running dev server (if any)
# Press Ctrl+C in terminal

# Start fresh dev server
npm run dev

# You should see:
# ✓ Ready in 3s
# ✓ http://localhost:3000
```

### Step 5: Check Real Data

**Visit homepage:** http://localhost:3000

**Look for:**
- ✅ Live Matches section showing REAL cricket matches (not mock)
- ✅ Team names and current scores updating
- ✅ Multiple live matches from different tournaments
- ✅ Upcoming Matches with real fixtures
- ✅ Recent Results with completed matches
- ✅ Cricket News with real headlines

---

## ✅ Verification Checklist

After configuration, verify:

```
☐ Dev server started without errors
☐ Homepage loads (http://localhost:3000)
☐ Live Matches section shows real matches
☐ Scores display (e.g., "145/4 in 12.3 overs")
☐ Team names are real cricket teams
☐ Upcoming Matches section populated
☐ Recent Results section showing completed matches
☐ Cricket News showing real headlines
☐ NO "Live Cricket Data Coming Soon" message
☐ NO error messages in browser console (F12)
```

---

## 🔍 If Something Doesn't Work

### Problem: Still seeing mock data

**Check 1: Verify API key is set**
```bash
# Open .env.local and verify:
CRICKET_API_KEY=your_actual_key_from_highlightly

# NOT these:
# CRICKET_API_KEY=your_api_key_here  ❌ (placeholder)
# CRICKET_API_KEY=                   ❌ (empty)
```

**Check 2: Make sure feature is enabled**
```bash
# In .env.local, verify:
ENABLE_REAL_CRICKET_DATA=true   ✅
ENABLE_MOCK_DATA=false          ✅

# NOT:
ENABLE_REAL_CRICKET_DATA=false  ❌
ENABLE_MOCK_DATA=true           ❌
```

**Check 3: Restart dev server**
```bash
# Stop: Press Ctrl+C
# Then: npm run dev
```

### Problem: See error messages

**Check browser console:**
- Press F12 key
- Click "Console" tab
- Look for error messages
- Copy error and check troubleshooting below

**Common errors:**
- "API key not valid" → Copy key again, verify no extra spaces
- "API request failed" → Check internet connection
- "Cannot read property 'matches'" → API response format issue

### Problem: No live matches showing

**This is normal!** Not always matches happening.

Check if it's:
- Outside cricket match hours (matches are during day in cricket zones)
- Off-season (cricket has seasons)
- Weekend or weekday (depends on tournament schedule)

**Solution:** Wait a bit or check the API provider's website to verify if matches are happening.

### Problem: Build errors

```bash
# Clear cache and rebuild
rm -r .next
npm run build
npm run dev
```

---

## 📚 Next Steps

### See full documentation
- `API_INTEGRATION_GUIDE.md` - Complete guide (300+ lines)
- `IMPLEMENTATION_SUMMARY.md` - What was implemented
- `DATA_INTEGRATION_README.md` - Setup reference

### Test different sections
1. Homepage (live data)
2. /live (live matches)
3. /upcoming (scheduled fixtures)
4. /finished (completed matches)
5. /news (cricket news)

### Explore the code
- `src/services/cricket-api.service.ts` - API client
- `src/hooks/use*.ts` - Data fetching hooks
- `src/components/features/match/*.tsx` - Match display components

---

## 💡 Pro Tips

### Switch to different provider
```bash
# In .env.local, change provider:
NEXT_PUBLIC_CRICKET_API_PROVIDER=rapidapi
CRICKET_API_KEY=your_rapidapi_key
```

### Disable real data (go back to mock)
```bash
# In .env.local:
ENABLE_REAL_CRICKET_DATA=false
ENABLE_MOCK_DATA=true
```

### Check API status
- Highlightly status: https://highlightly.net/status
- RapidAPI status: https://status.rapidapi.com
- EntitySport: https://entitysport.com/status

### Monitor API usage
- Visit your provider's dashboard
- Check requests count
- Make sure you're under quota
- Free tiers are usually very generous

---

## 🎯 Summary

### What happens when configured correctly:
```
✅ Real cricket matches appear
✅ Scores update automatically (every 30 seconds for live)
✅ Multiple tournaments show simultaneously
✅ Beautiful premium UI displays real data
✅ Professional sports platform ready
```

### Time investment:
```
Sign up: 1 minute
Get API key: 30 seconds
Configure: 1 minute
Restart: 1 minute
Verify: 30 seconds
Total: ~5 minutes
```

### What you get:
```
✓ Live cricket scores in real-time
✓ Upcoming match fixtures
✓ Completed match results
✓ Latest cricket news
✓ Professional sports platform
✓ Production-ready application
```

---

## 🆘 Need Help?

### Check these files first:
1. `API_INTEGRATION_GUIDE.md` - Complete troubleshooting
2. `IMPLEMENTATION_SUMMARY.md` - What's implemented
3. `.env.local.example` - Configuration reference

### Useful resources:
- Highlightly docs: https://cricket.highlightly.net
- Next.js docs: https://nextjs.org
- TanStack Query: https://tanstack.com/query

### Debug tips:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for API calls
5. Verify `.env.local` is saved

---

## 🚀 Ready?

```bash
# 1. Get API key from https://highlightly.net
# 2. Add to .env.local
# 3. Run:
npm run dev

# Real cricket data will appear! 🏏
```

**Enjoy SportsVerse with real cricket data!**

---

**Last Updated:** July 4, 2026  
**Time to Complete:** 5 minutes  
**Difficulty:** ⭐ Easy  
**Status:** ✅ Ready to Go
