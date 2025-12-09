// Route Distance Database view
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Popover,
  MenuList,
  ListItemText,
} from '@mui/material'
import {
  ArrowBack,
  Storage,
  Delete,
  CheckCircle,
  Error as ErrorIcon,
  ChevronLeft,
  ChevronRight,
  ArrowDropDown,
} from '@mui/icons-material'
import { api } from '@shared/api/client'

interface RouteDistance {
  id?: number
  Origin_3DZ: string
  Destination_3DZ: string
  Origin_5DZ?: string
  Destination_5DZ?: string
  Origin_Country?: string
  Destination_Country?: string
  Distance?: number
  Status?: string
  Source?: string
  Error_Reason?: string
  calculated_at?: string
}

export default function RouteDistanceDatabase() {
  const navigate = useNavigate()
  const [routes, setRoutes] = useState<RouteDistance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('error')
  const [originCountryFilter, setOriginCountryFilter] = useState<string>('all')
  const [destinationCountryFilter, setDestinationCountryFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [page, setPage] = useState(0)
  const [pageSize] = useState(100)
  const [totalRows, setTotalRows] = useState(0)
  const [filterAnchor, setFilterAnchor] = useState<{ [key: string]: HTMLElement | null }>({})

  const fetchRoutes = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(originCountryFilter !== 'all' && { origin_country: originCountryFilter }),
        ...(destinationCountryFilter !== 'all' && { destination_country: destinationCountryFilter }),
        ...(sourceFilter !== 'all' && { source: sourceFilter }),
      })
      const data = await api.get<{
        routes: RouteDistance[]
        total: number
        page: number
        page_size: number
      }>(`/api/route-distance/database?${params}`)
      setRoutes(data.routes || [])
      setTotalRows(data.total || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load routes')
    } finally {
      setLoading(false)
    }
  }, [destinationCountryFilter, originCountryFilter, page, pageSize, sourceFilter, statusFilter])

  useEffect(() => {
    fetchRoutes()
  }, [fetchRoutes])

  useEffect(() => {
    setPage(0)
  }, [statusFilter, originCountryFilter, destinationCountryFilter, sourceFilter])

  // Get unique values for filter dropdowns (narrow to string[])
  const uniqueOriginCountries: string[] = Array.from(
    new Set(
      routes
        .map((r) => r.Origin_Country)
        .filter((c): c is string => Boolean(c))
    )
  ).sort()
  const uniqueDestCountries: string[] = Array.from(
    new Set(
      routes
        .map((r) => r.Destination_Country)
        .filter((c): c is string => Boolean(c))
    )
  ).sort()
  const uniqueSources: string[] = Array.from(
    new Set(
      routes
        .map((r) => r.Source)
        .filter((s): s is string => Boolean(s))
    )
  ).sort()

  const handleFilterClick = (filterType: string, event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(prev => ({ ...prev, [filterType]: event.currentTarget }))
  }

  const handleFilterClose = (filterType: string) => {
    setFilterAnchor(prev => ({ ...prev, [filterType]: null }))
  }

  const handleFilterSelect = (filterType: string, value: string) => {
    if (filterType === 'status') setStatusFilter(value)
    if (filterType === 'originCountry') setOriginCountryFilter(value)
    if (filterType === 'destinationCountry') setDestinationCountryFilter(value)
    if (filterType === 'source') setSourceFilter(value)
    handleFilterClose(filterType)
  }

  // getFilterLabel was unused; removed to satisfy linter

  // isFilterActive was unused; removed to satisfy linter

  const filteredRoutes = routes.filter((route) => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      route.Origin_3DZ?.toLowerCase().includes(search) ||
      route.Destination_3DZ?.toLowerCase().includes(search) ||
      route.Origin_5DZ?.toLowerCase().includes(search) ||
      route.Destination_5DZ?.toLowerCase().includes(search) ||
      route.Origin_Country?.toLowerCase().includes(search) ||
      route.Destination_Country?.toLowerCase().includes(search) ||
      route.Error_Reason?.toLowerCase().includes(search)
    )
  })

  const handleDeleteClick = async (route: RouteDistance) => {
    if (!confirm(`Are you sure you want to delete this route?\n${route.Origin_3DZ || route.Origin_5DZ} → ${route.Destination_3DZ || route.Destination_5DZ}`)) {
      return
    }

    try {
      const deleteData = {
        origin_3dz: route.Origin_3DZ,
        destination_3dz: route.Destination_3DZ,
        origin_country: route.Origin_Country || undefined,
        destination_country: route.Destination_Country || undefined,
      }

      await api.post('/api/route-distance/database/delete', deleteData)
      
      setError('') // Clear any previous errors
      
      // Refresh routes after delete
      await fetchRoutes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete route')
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/route-distance')} sx={{ ml: -1 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Storage sx={{ fontSize: 34, color: 'primary.main' }} />
            Route Distance Database
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 250 }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              title="Previous page"
              color="primary"
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              size="small"
              disabled={routes.length < pageSize}
              onClick={() => setPage((p) => p + 1)}
              title="Next page"
              color="primary"
            >
              <ChevronRight />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              Total: {totalRows.toLocaleString()} rows
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Filter Popovers */}
      <Popover
        open={Boolean(filterAnchor.status)}
        anchorEl={filterAnchor.status}
        onClose={() => handleFilterClose('status')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuList>
          <MenuItem onClick={() => handleFilterSelect('status', 'all')} selected={statusFilter === 'all'}>
            <ListItemText>All</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleFilterSelect('status', 'success')} selected={statusFilter === 'success'}>
            <ListItemText>Success</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleFilterSelect('status', 'error')} selected={statusFilter === 'error'}>
            <ListItemText>Error</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>

      <Popover
        open={Boolean(filterAnchor.originCountry)}
        anchorEl={filterAnchor.originCountry}
        onClose={() => handleFilterClose('originCountry')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuList sx={{ maxHeight: 300, overflow: 'auto' }}>
          <MenuItem onClick={() => handleFilterSelect('originCountry', 'all')} selected={originCountryFilter === 'all'}>
            <ListItemText>All</ListItemText>
          </MenuItem>
          {uniqueOriginCountries.map((country) => (
            <MenuItem 
              key={country} 
              onClick={() => handleFilterSelect('originCountry', country)} 
              selected={originCountryFilter === country}
            >
              <ListItemText>{country}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>

      <Popover
        open={Boolean(filterAnchor.destinationCountry)}
        anchorEl={filterAnchor.destinationCountry}
        onClose={() => handleFilterClose('destinationCountry')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuList sx={{ maxHeight: 300, overflow: 'auto' }}>
          <MenuItem onClick={() => handleFilterSelect('destinationCountry', 'all')} selected={destinationCountryFilter === 'all'}>
            <ListItemText>All</ListItemText>
          </MenuItem>
          {uniqueDestCountries.map((country) => (
            <MenuItem 
              key={country} 
              onClick={() => handleFilterSelect('destinationCountry', country)} 
              selected={destinationCountryFilter === country}
            >
              <ListItemText>{country}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>

      <Popover
        open={Boolean(filterAnchor.source)}
        anchorEl={filterAnchor.source}
        onClose={() => handleFilterClose('source')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuList>
          <MenuItem onClick={() => handleFilterSelect('source', 'all')} selected={sourceFilter === 'all'}>
            <ListItemText>All</ListItemText>
          </MenuItem>
          {uniqueSources.map((source) => (
            <MenuItem 
              key={source} 
              onClick={() => handleFilterSelect('source', source)} 
              selected={sourceFilter === source}
            >
              <ListItemText>{source.charAt(0).toUpperCase() + source.slice(1)}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 400px)' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Origin 3DZ</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Destination 3DZ</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Origin 5DZ</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Destination 5DZ</TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: 'primary.main', 
                    color: 'primary.contrastText',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  onClick={(e) => handleFilterClick('originCountry', e)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    Origin Country
                    <ArrowDropDown fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: 'primary.main', 
                    color: 'primary.contrastText',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  onClick={(e) => handleFilterClick('destinationCountry', e)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    Destination Country
                    <ArrowDropDown fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Distance (mi)</TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: 'primary.main', 
                    color: 'primary.contrastText',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  onClick={(e) => handleFilterClick('status', e)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    Status
                    <ArrowDropDown fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Actions</TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: 'primary.main', 
                    color: 'primary.contrastText',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  onClick={(e) => handleFilterClick('source', e)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    Source
                    <ArrowDropDown fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Error Reason</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Calculated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRoutes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No routes found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoutes.map((route, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{route.Origin_3DZ || '-'}</TableCell>
                    <TableCell>{route.Destination_3DZ || '-'}</TableCell>
                    <TableCell>{route.Origin_5DZ || '-'}</TableCell>
                    <TableCell>{route.Destination_5DZ || '-'}</TableCell>
                    <TableCell>{route.Origin_Country || '-'}</TableCell>
                    <TableCell>{route.Destination_Country || '-'}</TableCell>
                    <TableCell>
                      {route.Distance !== null && route.Distance !== undefined
                        ? route.Distance.toFixed(2)
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {route.Status === 'success' ? (
                        <Chip
                          icon={<CheckCircle />}
                          label="Success"
                          color="success"
                          size="small"
                        />
                      ) : route.Status === 'error' ? (
                        <Chip
                          icon={<ErrorIcon />}
                          label="Error"
                          color="error"
                          size="small"
                        />
                      ) : (
                        <Chip label={route.Status || '-'} size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="error" 
                        title="Delete route"
                        onClick={() => handleDeleteClick(route)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Chip label={route.Source || '-'} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={route.Error_Reason || ''}
                      >
                        {route.Error_Reason || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {route.calculated_at
                        ? new Date(route.calculated_at).toLocaleString()
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

