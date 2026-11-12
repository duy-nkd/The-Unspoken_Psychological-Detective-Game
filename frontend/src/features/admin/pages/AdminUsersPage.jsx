import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchAdminEvidence, fetchAdminUserSave, fetchAdminUsers } from '../api/adminApi'
import { SaveJsonModal } from '../components/SaveJsonModal'
import { StatusBadge } from '../components/StatusBadge'

/**
 * Trang 2: Quản lý Người dùng & Xem tiến trình Sổ tay điều tra.
 */
export function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [evidenceCatalog, setEvidenceCatalog] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedSave, setSelectedSave] = useState(null)
  const [inspectLoadingId, setInspectLoadingId] = useState(null)

  const loadUsers = useCallback(async () => {
    try {
      const [usersData, evidenceData] = await Promise.all([
        fetchAdminUsers(),
        fetchAdminEvidence().catch(() => []),
      ])
      setUsers(usersData)
      setEvidenceCatalog(evidenceData)
      setError('')
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách người dùng.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    Promise.all([fetchAdminUsers(), fetchAdminEvidence().catch(() => [])])
      .then(([usersData, evidenceData]) => {
        if (!active) return
        setUsers(usersData)
        setEvidenceCatalog(evidenceData)
        setError('')
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Không thể tải danh sách người dùng.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        String(u.id).includes(q),
    )
  }, [users, search])

  const handleInspectSave = async (userId) => {
    setInspectLoadingId(userId)
    setError('')
    try {
      const detail = await fetchAdminUserSave(userId)
      setSelectedSave(detail)
    } catch (err) {
      setError(err.message || 'Không thể tải hồ sơ lưu của người chơi này.')
    } finally {
      setInspectLoadingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Quản lý tài khoản
          </span>
          <h1 className="mt-0.5 text-2xl font-bold text-[#f4efe6]">
            Danh sách Thám tử & Tiến trình Điều tra
          </h1>
        </div>
        <button
          type="button"
          onClick={loadUsers}
          className="rounded border border-[#5c5266] bg-[#241f2b] px-3.5 py-1.5 text-xs font-medium text-[#f4efe6] transition hover:border-amber-400 hover:text-amber-300"
        >
          ↻ Làm mới danh sách
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#5c5266]/60 bg-[#241f2b] p-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên tài khoản, email hoặc mã ID..."
          className="w-full max-w-md rounded border border-[#5c5266] bg-[#17151b] px-3.5 py-2 text-sm text-[#f4efe6] placeholder-[#6f6874] focus:border-amber-400 focus:outline-none"
        />
        <span className="text-xs text-[#a89f94]">
          Hiển thị <strong className="text-[#f4efe6]">{filteredUsers.length}</strong> /{' '}
          {users.length} tài khoản
        </span>
      </div>

      {error && (
        <div className="rounded border border-[#d9534f] bg-[#d9534f]/10 p-4 text-xs text-[#f28b88]">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded border border-[#5c5266]/60 bg-[#241f2b]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#3d3546] bg-[#17151b]/60 text-xs font-semibold uppercase text-[#a89f94]">
              <th className="px-4 py-3">Mã</th>
              <th className="px-4 py-3">Tài khoản</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Tiến độ chương</th>
              <th className="px-4 py-3">Điểm uy tín</th>
              <th className="px-4 py-3">Cập nhật gần nhất</th>
              <th className="px-4 py-3 text-right">Hồ sơ điều tra</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2f2937]">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-xs text-[#a89f94]">
                  Đang tải danh sách tài khoản…
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-xs text-[#a89f94]">
                  Không tìm thấy tài khoản phù hợp.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="transition hover:bg-[#2f2937]/60">
                  <td className="px-4 py-3 font-mono text-xs text-[#a89f94]">#{u.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#f4efe6]">{u.username}</div>
                    <div className="text-xs text-[#a89f94]">{u.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={u.role} />
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {u.hasSave ? (
                      <span className="font-medium text-amber-300">Chương {u.currentChapter}</span>
                    ) : (
                      <span className="text-[#6f6874]">Chưa bắt đầu</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {u.hasSave ? (
                      <span
                        className={
                          u.credibilityScore <= 30
                            ? 'font-bold text-[#f28b88]'
                            : 'font-semibold text-emerald-300'
                        }
                      >
                        {u.credibilityScore} / 100
                      </span>
                    ) : (
                      <span className="text-[#6f6874]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#a89f94]">
                    {u.lastSavedAt ? String(u.lastSavedAt).replace('T', ' ').slice(0, 19) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.hasSave ? (
                      <button
                        type="button"
                        disabled={inspectLoadingId === u.id}
                        onClick={() => handleInspectSave(u.id)}
                        className="rounded border border-amber-400/60 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300 transition hover:bg-amber-400 hover:text-[#17151b] disabled:opacity-50"
                      >
                        {inspectLoadingId === u.id ? 'Đang mở…' : 'Xem sổ tay'}
                      </button>
                    ) : (
                      <span className="text-xs text-[#6f6874]">Chưa có dữ liệu</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SaveJsonModal
        saveDetail={selectedSave}
        evidenceCatalog={evidenceCatalog}
        onClose={() => setSelectedSave(null)}
      />
    </div>
  )
}
